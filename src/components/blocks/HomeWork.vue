<script setup lang="ts">
import {ref} from 'vue';
import {useSupabase} from '~/utils/supabase';
import IftaLabel from 'primevue/iftalabel';
import PageLoader from "~/src/components/ui/PageLoader.vue";
import {backendApiUrl} from "~/utils/api";
import HomeWorkBox from "~/src/components/homeWorkBox.vue";

const supabase = useSupabase()
const props = defineProps(['lessonId'])
const files = ref([]);

const backUrl  = backendApiUrl

const comment = ref('');
const toast = useToast();

const handleFileChange = (event: any) => {
  console.log('event', event.files);
  files.value = Array.from(event.files);
  console.log('files', files.value);
};
const {data: homeWork, pending, error, refresh: refreshHomeWork} = useAsyncData("homeWork", async () => {
  const user = await supabase.auth.getUser();

  const {data, error} = await supabase.from("homeworks")
      .select("*").select('*')
      .eq('lesson_id', props.lessonId)
      .eq('user_id', user.data.user.id)
      .maybeSingle()

  if (error) throw new Error(error.message);
  return {
    ...data,
    files_url: data.files_url ? JSON.parse(data.files_url) : null,
  }
});

const loading = ref(false)

const uploadHomework = async () => {
  console.log('files', files.value)
  if (!files.value || files.value.length === 0) {
    alert("Выберите файлы!");
    return;
  }

  if (files.value.length > 5) {
    toast.add({severity: "error", summary: "Error", detail: "Можно загрузить максимум 5 файлов!", life: 3000});
    return;
  }

  const user = await supabase.auth.getUser();
  if (!user?.data?.user) {
    toast.add({severity: "error", summary: "Error", detail: "Вы не авторизованы!", life: 3000});
    return;
  }

  loading.value = true;
  const formData = new FormData();

  for (let i = 0; i < files.value.length; i++) {
    const file = files.value[i];

    if (file.size > 10 * 1024 * 1024) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: `Файл ${file.name} слишком большой! Максимальный размер – 10MB.`,
        life: 3000
      });
      loading.value = false;
      return;
    }

    const fileName = `${Date.now()}-${file.name}`;
    formData.append("files", file, fileName);
  }

  try{
    const res = await fetch(`${backUrl}/upload`, {
      method: "POST",
      body: formData,
    });

    const response = await res.json();

    if (res.status !== 200) {
      toast.add({severity: "error", summary: "Error", detail: "Ошибка загрузки файлов", life: 3000});
      loading.value = false;
      return;
    }

    const fileUrls = response.filepaths; // Ожидаем массив ссылок

    const {error: dbError} = await supabase
        .from("homeworks")
        .insert([
          {
            lesson_id: props.lessonId,
            user_id: user.data.user.id,
            files_url: JSON.stringify(fileUrls), // 💡 Сохраняем массив ссылок
            comment: comment.value,
          },
        ]);

    if (dbError) {
      toast.add({severity: "error", summary: "Error", detail: "Ошибка сохранения", life: 3000});
      loading.value = false;
      return;
    }

    loading.value = false;
    checkIsFinishCourse();
    refreshHomeWork();
  }catch (err){
    toast.add({severity: "error", summary: "Error", detail: "Ошибка загрузки файлов", life: 3000});
    loading.value = false;
  }
};



const checkIsFinishCourse = async () => {
  const user = await supabase.auth.getUser();

  const {data, error} = await supabase
      .from('homeworks')
      .select('*')
      .eq('user_id', user.data.user.id)
      .order('created_at', {ascending: false});

  if (Array.isArray(data) && data.length === 8) {
    const {error} = await supabase
        .from("profiles")
        .update({finishCourse: true})
        .eq("id", user.data.user.id);

    if (error) {
      toast.add({severity: 'error', summary: 'Ошибка', detail: 'Ошибка добавления новых уроков', life: 3000});
      return;
    }

    toast.add({severity: 'success', summary: 'Бонус', detail: 'Вам открылись новые уроки', life: 3000});
    setTimeout(() => {
      window.location.reload()
    }, 3000)
  }
}
const isImage = (url: string) => {
  return url.match(/\.(jpeg|jpg|gif|png|webp)$/i);
};

const isVideo = (url: string) => {
  return url.match(/\.(mp4|webm|ogg)$/i);
};
</script>

<template>
  <div class="homework">
    <Toast></Toast>
    <img class="homework-icon" src="/home.png" alt="">
    <h3>{{ $t('course.homeWork') }}</h3>

    <div v-if="pending">
      <PageLoader></PageLoader>
    </div>
    <form v-else-if="!homeWork" @submit.prevent="uploadHomework">
      <div class="homework-file">
        <FileUpload class="" accept="image/*,video/*" :multiple="true" mode="basic" name="demo[]" :maxFileSize="10485760"
                    @select="handleFileChange" chooseLabel="Загрузить файл"/>
      </div>

      <Textarea v-model="comment" rows="5" cols="30" style="width: 100%" placeholder="Оставьте комментарий"/>
      <Button type="submit" class="mt-2" :loading="loading" :disabled="loading">{{ $t('action.send') }}</Button>
    </form>
    <div v-else>
      <HomeWorkBox
        :lesson-id="lessonId"
        :home-work="homeWork"
        @update:refresh-list="refreshHomeWork"
      />

    </div>
  </div>
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