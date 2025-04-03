<script setup lang="ts">
import AppLayout from "~/src/layouts/AppLayout.vue";
import { ref, onMounted } from 'vue';
import {useSupabase} from '~/utils/supabase';
import IftaLabel from "primevue/iftalabel";
const supabase = useSupabase()
import Select from 'primevue/select';
import HomeWorkBox from "~/src/components/homeWorkBox.vue";

const route = useRoute()
const userId = route.params.id
const filterUser = ref();
const answer = ref('')
const homeworks = ref<any>([]);
const homeworksFiltered = computed(() => {
  if(homeworks.value.length === 0) return [];
  if(!filterUser.value) return homeworks.value;
  return homeworks.value.filter((el: any) => el.user_id === filterUser.value)
})
onMounted(async () => {
  fetchHomeworks()
});

const fetchHomeworks = async () => {
  const { data, error } = await supabase
      .from('homeworks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

  if (error) {
    console.error('Ошибка загрузки домашних заданий:', error.message);
  } else {
    homeworks.value = data.map(el => {
      return {
        ...el,
        files_url: el.files_url ? JSON.parse(el.files_url) : [],
      }
    });
  }
}

const toast = useToast()

const sendAnswer = async (id: number, answer: string) => {
  const { error } = await supabase
      .from("homeworks")
      .update({ answer: answer })
      .eq("id", id);

  if (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Ошибка обновления ответа', life: 3000 });
    return;
  }

  toast.add({ severity: 'success', summary: 'Успешно', detail: 'Ответ успешно отправлен', life: 3000 });
}

const users = computed(() => {
  if(!homeworks.value) return []

  const userMap = new Map();

  homeworks.value.forEach((item: any) => {
    if (!userMap.has(item.user_id)) {
      userMap.set(item.user_id, { user_id: item.user_id });
    }
  });

  return Array.from(userMap.values()).map(el => {
    return {
      name: el.user_id, code: el.user_id
    }
  })
})

</script>

<template>
  <AppLayout>
    <div class="container mt-4 pt-2">
      <Toast></Toast>
      <h3>Загруженные домашние задания</h3>
      <h5>USER: {{ userId }}</h5>

      <ul>
        <div
            v-for="el in homeworksFiltered" :key="el.id"
        >
          <HomeWorkBox
              :lesson-id="el.lesson_id"
              :is-admin="true"
              :home-work="el"
              @update:refresh-list="fetchHomeworks"
          />
        </div>

        <!--        <Fieldset v-for="el in homeworksFiltered" :key="el.id" :legend="'Задание урока - ' + el.lesson_id ">-->
        <!--          <div class="homework-el">-->
        <!--            <img src="/folders.png" style="max-width: 33px" alt="">-->
        <!--            <IftaLabel>-->
        <!--              <InputText id="username" :model-value="el.comment" readonly />-->
        <!--              <label for="username">Комментарий</label>-->
        <!--            </IftaLabel>-->
        <!--            <div class="gap-2 flex align-items-center">-->
        <!--              <IftaLabel>-->
        <!--                <InputText id="answer" v-model="el.answer"  />-->
        <!--                <label for="answer">Ваш ответ</label>-->
        <!--              </IftaLabel>-->
        <!--              <Button @click="sendAnswer(el.id, el.answer)" size="small">Send Answer</Button>-->
        <!--            </div>-->
        <!--            <div class="homework-el-end">-->
        <!--              <Button variant="outlined"  severity="danger" size="small">Удалить</Button>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </Fieldset>-->
      </ul>
    </div>
  </AppLayout>
</template>

<style scoped lang="scss">
.homework-el{
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
  &-end{
    margin-left: auto;
  }
}
</style>