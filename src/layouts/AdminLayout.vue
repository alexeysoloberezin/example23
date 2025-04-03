<script setup lang="ts">
import { useSupabase} from "~/utils/supabase";
import AppWrapper from "~/src/layouts/AppWrapper.vue";
import PageTitle from "~/src/components/blocks/PageTitle.vue";
const supabase = useSupabase()
const {locale} = useI18n()

const props = defineProps(['title'])
onMounted(async () => {
  const {data: res} = await supabase.auth.getUser();
  const {user} = res

  if (user) {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)  // Фильтруем по id авторизованного пользователя
        .single();

    if (error) {
      navigateTo(`/${locale.value || 'en'}/app/main`)
    } else {
      if(data && data.role !== 'admin'){
        navigateTo(`/${locale.value || 'en'}/app/main`)
      }else{
        show.value = true
      }
    }
  }
})

const show = ref(true)
</script>

<template>
  <AppWrapper>
    <div v-if="show">
      <slot></slot>
    </div>
  </AppWrapper>
</template>

<style scoped lang="scss">

</style>