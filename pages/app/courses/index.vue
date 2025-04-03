<script setup lang="ts">
import AdminLayout from "~/src/layouts/AppLayout.vue";
import CourseCard from "~/src/components/blocks/CourseCard.vue";
import PageLoader from "~/src/components/ui/PageLoader.vue";
import {useSupabase} from "~/utils/supabase";

useHead({
  title: "Neuro Aura | Courses"
});

const supabase = useSupabase()

const {locale} = useI18n()

const { data: courses, pending, error } = useAsyncData("courses_list", async () => {
  const { data, error } = await supabase.from("courses_list").select("*");
  console.log('datra', data)
  if (error) console.error(error.message);
  return data;
});


</script>

<template>
  <AdminLayout>
    <div class="container mt-4">
      <PageLoader v-if="pending"></PageLoader>
      <div v-else-if="error">{{ error.message }}</div>
      <div v-else :key="locale">
        <CourseCard
            v-for="course in courses"
            :text="locale === 'en' ? course.content_en : course.content"
            :title="locale === 'en' ? course.title_en : course.title"
            :image="course.image"

        >
          <div class="list" v-html="locale === 'en' ? course.list_en : course.list">
          </div>
          <div class="mt-4"></div>
          <NuxtLink :to="`/${locale || 'en'}/app/courses/view/1/1`">
            <Button :label="$t('action.buy')"></Button>
          </NuxtLink>
        </CourseCard>
      </div>

    </div>
  </AdminLayout>
</template>

<style scoped lang="scss">

</style>