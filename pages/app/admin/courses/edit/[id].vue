<script setup lang="ts">
import AdminLayout from "~/src/layouts/AdminLayout.vue";
import {ref} from 'vue';
import LessonForm from "~/src/components/blocks/lessonForm.vue";
import PageLoader from "~/src/components/ui/PageLoader.vue";
import PageTitle from "~/src/components/blocks/PageTitle.vue";
import {useSupabase} from "~/utils/supabase";

const value = ref('');
const supabase = useSupabase()

const {data: lessons, pending, error, refresh } = useAsyncData("free_lessons", async () => {
  const {data, error} = await supabase.from("free_lessons")
      .select("*")
      .order("id", { ascending: true });
  console.log('datra', data)
  if (error) console.error(error.message);
  return data;
});

const handleRefresh = async () => {
  await refresh(); // Вызываем refresh для повторной загрузки данных
};

</script>

<template>
  <AdminLayout title="Уроки курса">
    <div>
      <PageLoader v-if="pending"></PageLoader>
      <div v-else class="card">
        <Tabs v-model:value="value" scrollable>
          <TabList :key="lessons?.length">
            <Tab value="add">Добавить урок +</Tab>
            <Tab
                v-for="el in lessons"
                :value="el.id + ''">{{ el.id }}</Tab>
          </TabList>
          <TabPanels :key="lessons?.length">
            <TabPanel value="add">
              <LessonForm @update:refresh="handleRefresh"></LessonForm>
            </TabPanel>
            <TabPanel v-for="el in lessons" :value="el.id + ''">
              <LessonForm
                  v-bind="el"
                  @update:refresh="handleRefresh"
              ></LessonForm>

              <pre>{{ el }}</pre>

            </TabPanel>

          </TabPanels>
        </Tabs>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped lang="scss">

</style>