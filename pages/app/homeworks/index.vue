<script setup lang="ts">
import AppLayout from "~/src/layouts/AppLayout.vue";
import { useSupabase} from '~/utils/supabase';
import IftaLabel from "primevue/iftalabel";
import HomeWorkBox from "~/src/components/homeWorkBox.vue";

useHead({
  title: "Neuro Aura | HomeWork"
});

const supabase = useSupabase()
const user = await supabase.auth.getUser();
const toast = useToast();

// Функция загрузки домашних заданий
const fetchHomeworks = async () => {
  if (!user?.data?.user) return [];

  const { data, error } = await supabase
      .from("homeworks")
      .select("*")
      .eq("user_id", user.data.user.id)
      .order("id");

  if (error) {
    console.error("Ошибка загрузки домашних заданий:", error.message);
    return [];
  }
  return data.map(el => {
    return {
      ...el,
      files_url: el.files_url ? JSON.parse(el.files_url) : [],
    }
  });
};

// Используем useAsyncData для автоматического обновления
const { data: homeworks, refresh } = await useAsyncData("homeworks", fetchHomeworks);

// Функция удаления домашнего задания
const removeHomeWork = async (hw: any) => {
  const confirmDelete = confirm("Вы уверены, что хотите удалить домашнее задание?");
  if (!confirmDelete) return;

  try {
    if (!user?.data?.user) {
      toast.add({ severity: "error", summary: "Ошибка", detail: "Вы не авторизованы!", life: 3000 });
      return;
    }

    const filePath = hw.file_url.split("/").pop();
    const { error: storageError } = await supabase.storage
        .from("homeworks")
        .remove([filePath]);

    if (storageError) {
      toast.add({ severity: "error", summary: "Ошибка", detail: "Ошибка удаления файла", life: 3000 });
      return;
    }

    const { error: dbError } = await supabase
        .from("homeworks")
        .delete()
        .eq("lesson_id", hw.lesson_id)
        .eq("user_id", user.data.user.id);

    if (dbError) {
      toast.add({ severity: "error", summary: "Ошибка", detail: "Ошибка удаления из БД", life: 3000 });
      return;
    }

    toast.add({ severity: "success", summary: "Успешно", detail: "Домашнее задание удалено!", life: 3000 });

    await refresh(); // Обновляем данные после удаления
  } catch (error) {
    toast.add({ severity: "error", summary: "Ошибка", detail: "Ошибка при удалении", life: 3000 });
  }
};
</script>

<template>
  <AppLayout>
    <Toast />
    <div class="container mt-4 pt-2">
      <h3>Загруженные домашние задания</h3>
      <ul>
        <HomeWorkBox
            v-for="el in homeworks" :key="el.id"
            :lesson-id="el.lessonId"
            :home-work="el"
            @update:refresh-list="refresh"
        />
<!--        <Fieldset v-for="el in homeworks" :key="el.id" :legend="'Задание урока - ' + el.lesson_id ">-->
<!--          <div class="homework-el">-->
<!--            <img src="/folders.png" style="max-width: 33px" alt="">-->
<!--            <IftaLabel>-->
<!--              <InputText id="username" :model-value="el.comment" readonly />-->
<!--              <label for="username">Комментарий</label>-->
<!--            </IftaLabel>-->
<!--            <div v-if="el.answer" class="gap-2 flex align-items-center">-->
<!--              <IftaLabel>-->
<!--                <InputText id="answer" v-model="el.answer" readonly />-->
<!--                <label for="answer">Вам ответили</label>-->
<!--              </IftaLabel>-->
<!--            </div>-->
<!--            <div class="homework-el-end">-->
<!--              <Button variant="outlined"  severity="danger" size="small" @click="removeHomeWork(el)">Удалить</Button>-->
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
  @media (max-width: 700px) {
    flex-direction: column;
  }
  gap: 20px;
  &-end{
    margin-left: auto;
  }
}
</style>