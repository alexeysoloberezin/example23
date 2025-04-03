<script setup lang="ts">
import IftaLabel from "primevue/iftalabel";
import {useSupabase} from "~/utils/supabase";
import {backendApiUrl} from "~/utils/api";

const props = defineProps(['homeWork', 'lessonId', 'legend', 'isAdmin'])
const supabase = useSupabase()
const toast = useToast();
const backUrl  = backendApiUrl
const emits = defineEmits(['update:refreshList'])
const answer = ref(props.homeWork.answer || '')

const isImage = (url: string) => {
  return url.match(/\.(jpeg|jpg|gif|png|webp)$/i);
};

const isVideo = (url: string) => {
  return url.match(/\.(mp4|webm|ogg)$/i);
};

const answerLoading = ref(false)
const sendAnswer = async () => {
  if(!props.isAdmin) {
    return
  }
  answerLoading.value = true
  const { error } = await supabase
      .from("homeworks")
      .update({ answer: answer.value })
      .eq("id", props.homeWork.id);

  if (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Ошибка обновления ответа', life: 3000 });
    answerLoading.value = false
    return;
  }

  toast.add({ severity: 'success', summary: 'Успешно', detail: 'Ответ успешно отправлен', life: 3000 });
  answerLoading.value = false
}

const removeHomeWork = async () => {
  const confirmDelete = confirm("Вы уверены, что хотите удалить домашнее задание?");
  if (!confirmDelete) return;

  try {
    const user = await supabase.auth.getUser();
    if (!user?.data?.user) {
      toast.add({ severity: "error", summary: "Error", detail: "Вы не авторизованы!", life: 3000 });
      return;
    }

    // Массив файлов
    const files = props.homeWork.files_url;

    if (files && files.length > 0) {
      // Удаляем файлы циклом
      for (const fileUrl of files) {
        const filename = fileUrl.split("/").pop(); // Извлекаем имя файла
        await fetch(`${backUrl}/delete/${filename}`, {
          method: "DELETE",
        });
      }
    }

    // Удаляем запись из Supabase
    const { error: dbError } = await supabase
        .from("homeworks")
        .delete()
        .eq("lesson_id", props.homeWork.lesson_id)
        .eq("user_id", user.data.user.id);

    if (dbError) {
      toast.add({ severity: "error", summary: "Error", detail: "Ошибка удаления из БД", life: 3000 });
      return;
    }

    toast.add({ severity: "success", summary: "Успешно", detail: "Домашнее задание удалено!", life: 3000 });
    emits('update:refreshList')
  } catch (error) {
    console.log('err', error)
    toast.add({ severity: "error", summary: "Error", detail: "Ошибка при удалении", life: 3000 });
  }
};
</script>

<template>
  <Fieldset :legend="legend || 'Lesson: ' + homeWork.lesson_id">

    <IftaLabel class="w-full mb-2">
      <Textarea id="username" :model-value="homeWork.comment" readonly class="w-full"/>
      <label for="username">{{ $t('course.comment') }}</label>
    </IftaLabel>

    <IftaLabel v-if="isAdmin" class="w-full mb-3">
      <InputText id="answer" v-model="answer" class="w-full"  @keydown.enter="sendAnswer"/>
      <label for="answer">{{ !answerLoading ? 'Ответ' : 'Загрузка...' }}</label>
    </IftaLabel>

    <div class="homework-el">
      <img src="/folders.png" style="max-width: 33px" alt="">

      <!-- Текстовый комментарий -->




      <!-- Предпросмотр файла -->
      <Button variant="outlined" @click="removeHomeWork">{{ $t('action.remove') }}</Button>
    </div>
    <div>
      <div v-if="homeWork.files_url && Array.isArray(homeWork.files_url)" class="homework-files">
        <div v-for="el in homeWork.files_url" >
          <template v-if="isImage(el)">
            <Image :preview="true" :src="backUrl + el"  alt="Загруженное изображение"/>
          </template>

          <template v-else-if="isVideo(el)">
            <video class="preview-video" controls>
              <source :src="backUrl + el" type="video/mp4"/>
              Ваш браузер не поддерживает видео.
            </video>
          </template>

          <template v-else>
            <a :href="el" target="_blank" class="preview-link">📄 Открыть файл</a>
          </template>
        </div>

      </div>
    </div>
  </Fieldset>
</template>

<style scoped lang="scss">
.preview-image {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  margin-top: 10px;
}
.homework-files{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr 1fr ;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr  ;
  }
}
.preview-video {
  max-width: 100%;
  max-height: 300px;
  margin-top: 10px;
}

.preview-link {
  display: inline-block;
  margin-top: 10px;
  color: #3498db;
  text-decoration: underline;
}

.homework-icon {
  max-width: 70px;
  margin-bottom: 15px;
}

.homework-el {
  display: flex;
  gap: 20px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
}

.homework {
  background: rgba(255, 255, 255, 0.02);
  padding: 20px;
  border-radius: 15px;
  //border: 1px solid #223297;
  &-file {
    margin: 10px 0;
  }
}
</style>