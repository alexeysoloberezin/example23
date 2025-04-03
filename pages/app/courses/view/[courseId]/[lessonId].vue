<script setup lang="ts">
import AdminLayout from "~/src/layouts/AppLayout.vue";
import CourseWrapper from "~/src/components/wrapper/courseWrapper.vue";
import {useStorage} from '@vueuse/core'
import {useSupabase} from "~/utils/supabase";
import AppLayout from "~/src/layouts/AppLayout.vue";
import PageLoader from "~/src/components/ui/PageLoader.vue";
import {useUserStore} from "~/store/userStora";
import Dialog from 'primevue/dialog';
import Timer from "~/src/components/blocks/Timer.vue";

useHead({
  title: "Neuro Aura | Course"
});

const {locale} = useI18n()
const supabase = useSupabase()
const togglePanel = useStorage('togglePanel', true)
const route = useRoute();
const lessonId = route.params.lessonId;
const trial = route.query.trial
const userStore = useUserStore()
const {user, finishedLessons} = storeToRefs(userStore)

const visible = ref(false)
onMounted(() => {
  if (!user.value && trial === 'true') {
    const savedPhone = localStorage.getItem('savedPhone')
    if(savedPhone){
      return
    }
    visible.value = true
  }
})

const {data: lesson, pending, error, refresh} = useAsyncData(
    'free_lesson',
    async () => {
      const {data, error, status} = await supabase
          .from('free_lessons')
          .select('*')
          .eq('id', lessonId)
          .single();

      if (!data && status === 406) {
        throw new Error('Ошибка: недостаточно прав для чтения free_lessons');
      }

      if (error) {
        throw new Error(error.message); // Явно выбрасываем ошибку
      }

      return data;
    }
);

const {
  data: lessons,
  pending: pending_lessons,
  error: error_lessons,
  refresh: refresh_lessons
} = useAsyncData('free_lessons', async () => {
  const {data, error} = await supabase
      .from('free_lessons_filtered')
      .select('id, title, title_en')
      .order('id')

  if (error) {
    console.error('Ошибка запроса:', error.message);
    throw new Error(error.message); // Явно выбрасываем ошибку
  }

  return data;
});

const phone = ref('')
const phoneLoading = ref(false)
const toast = useToast()

const savePhone = async () => {
  if (phone.value.length < 6) {
    toast.add({severity: 'error', summary: 'Error', detail: 'Phone not correct', life: 3000});
    return
  }
  phoneLoading.value = true
  const {data, error} = await supabase
      .from('phones')  // Имя таблицы
      .insert([{phone: phone.value}]) // Вставляем номер

  if (error) {
    if(error.code !== '23505'){
      toast.add({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
      return
    }
  }
  localStorage.setItem('savedPhone', phone.value)
  phone.value = "" // Очистить поле после отправки
  visible.value = false
  phoneLoading.value = false
}

</script>

<template>
  <AppLayout>
    <Dialog v-model:visible="visible" modal header="Please write your phone" :style="{ width: '25rem' }">
      <!--      <span class="text-surface-500 dark:text-surface-400 block mb-8">Please write your phone</span>-->
      <div class="flex items-center gap-4 mb-4">
        <label for="phone" class="font-semibold w-24">Phone</label>
        <InputText v-model="phone" id="phone" class="flex-auto" autocomplete="off"/>
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Send" :loading="phoneLoading" :disabled="phoneLoading" @click="savePhone"></Button>
      </div>
    </Dialog>
    <Toast/>

    <Timer v-if="user?.hasSub === false || !user" :showButton="true"/>

    <div v-if="pending || pending_lessons">
      <PageLoader/>
    </div>
    <div v-else-if="error_lessons">
      {{ error_lessons.message }}
    </div>
    <div v-else-if="error">
      <div v-if="error.message  === 'Ошибка: недостаточно прав для чтения free_lessons'"
           class="mt-4 flex align-items-center flex-column">
        <h3 class="text-center mb-3">
          У вас нет доступа к курсу.
        </h3>
        <NuxtLink :to="`/${locale || 'en'}/app/buy/15`">
          <Button class="w-fit mx-auto">Перейти на страницу покупки</Button>
        </NuxtLink>
      </div>
    </div>

    <CourseWrapper
        v-else
        :lesson="lesson"
        :loading="pending"
        :toggle-panel="togglePanel"
        :activeLesson="lessonId"
        :lessons="lessons"
        @set-toggle-panel="(v) => togglePanel = v">
    </CourseWrapper>
  </AppLayout>
</template>

<style scoped lang="scss">

</style>