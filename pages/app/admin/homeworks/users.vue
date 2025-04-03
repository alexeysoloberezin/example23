<script setup lang="ts">

import AdminLayout from "~/src/layouts/AdminLayout.vue";
import Tag from 'primevue/tag';
const supabase = useSupabase()

const { data, error, pending } = await useAsyncData("homeworks", async () => {
  const { data: profiles, error: profilesError } = await supabase.from("profiles").select("*").eq("hasSub", true);
  if (profilesError) throw profilesError;

  const { data: homeworks, error: homeworksError } = await supabase.from("homeworks").select("user_id");
  if (homeworksError) throw homeworksError;

  // Подсчитываем количество домашних заданий вручную
  const homeworkCountMap = homeworks.reduce((acc, hw) => {
    acc[hw.user_id] = (acc[hw.user_id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Добавляем счетчик домашних заданий и сортируем по убыванию
  const profilesWithHomeworks = profiles
      .map((profile) => ({
        ...profile,
        homework_count: homeworkCountMap[profile.id] || 0,
      }))
      .sort((a, b) => b.homework_count - a.homework_count); // Сортировка по убыванию

  return profilesWithHomeworks;
});

</script>

<template>
  <AdminLayout>

    <div class="container">
      <div class="wrp">
        <NuxtLink v-for="el in data" :key="el.id" :to="`/ru/app/admin/homeworks/${el.id}`">
          <Card >
            <template #title>{{ el.email }}</template>
            <template #content>
              <Tag :severity="el.hasSub ? 'success' : 'danger'" :value="el.hasSub ? 'Премиум акк' : 'Бесплатный акк'"></Tag>
              <p class="m-0">
                Домашних заданий: {{ el.homework_count }}
              </p>
            </template>
          </Card>
        </NuxtLink>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped lang="scss">
.wrp{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
}
</style>