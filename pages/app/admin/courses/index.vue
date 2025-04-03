<script setup lang="ts">

import AdminLayout from "~/src/layouts/AdminLayout.vue";
import PageLoader from "~/src/components/ui/PageLoader.vue";
import {useSupabase} from "~/utils/supabase";
const supabase = useSupabase()

const { data: courses, pending, error } = useAsyncData("courses_list", async () => {
  const { data, error } = await supabase.from("courses_list").select("*");
  console.log('datra', data)
  if (error) console.error(error.message);
  return data;
});
const {locale} = useI18n()
</script>

<template>
  <AdminLayout>
    <div class="container mt-4">
      <div class="flex align-center mb-3 justify-content-between">
        <h3>Курсы</h3>
        <NuxtLink :to="`/${locale || 'en'}/app/admin/courses/add`">
          <Button variant="outlined" label="Добавить курс"></Button>
        </NuxtLink>
      </div>

      <PageLoader v-if="pending"></PageLoader>
      <div v-else>
        <Card v-for="el in courses" :key="el.id">
          <template #title>{{ el.title }}</template>
<!--          <template #subtitle>{{ el.text }}</template>-->
          <template #footer>
           <NuxtLink :to="`/${locale || 'en'}/app/courses/view/${el.id}`">
             <Button label="Ссылка на курс" variant="outlined" class="mr-2"></Button>
           </NuxtLink>
            <NuxtLink :to="`/${locale || 'en'}/app/admin/courses/edit/${el.id}`">
              <Button label="Изменить"></Button>
            </NuxtLink>
          </template>
        </Card>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped lang="scss">

</style>