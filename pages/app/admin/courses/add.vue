<script setup lang="ts">
import AdminLayout from "~/src/layouts/AdminLayout.vue";
import Label from "~/src/components/ui/Label.vue";
import PageLoader from "~/src/components/ui/PageLoader.vue";
import FileUpload from 'primevue/fileupload';
import {useSupabase} from "~/utils/supabase";

const bucketName = "Courses";
const fileupload = ref();
const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const supabase = useSupabase()

const data = ref({
  title: '',
  content: '',
  image: '',
  list: ''
})
const toast = useToast();
const loading = ref(false)
const {locale} = useI18n()

const submit = async () => {
  loading.value = true

  if (selectedFile.value) {
    const uploadSuccess = await uploadImage();
    if (!uploadSuccess) {
      loading.value = false;
      return; // ❌ Останавливаем `submit()`, если загрузка картинки не удалась
    }
  }

  const { data: course, error } = await supabase
      .from('courses_list')
      .insert([
        data.value
      ]);

  if (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
    loading.value = false
  } else {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Успешно созданно', life: 3000 });
    data.value = { title: '',  content: '', image: null, list: '' };
    previewUrl.value = null; // Сбрасываем превью
    setTimeout(() => {
      navigateTo(`/${locale.value || 'en'}/app/admin/courses`)
      loading.value = false
    }, 2000)
  }
}

const onFileSelect = (event: any) => {
  const file = event.files[0]; // Берем первый файл
  if (!file) return;

  selectedFile.value = file;

  // Создаем URL для предпросмотра
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    previewUrl.value = reader.result as string;
  };
};

const uploadImage = async () => {
  if (!selectedFile.value) {
    toast.add({ severity: "error", summary: "Ошибка", detail: "Выберите файл!", life: 3000 });
    return;
  }

  const filePath = `courses/${Date.now()}-${selectedFile.value.name}`;

  const { data: uploadData, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, selectedFile.value);

  console.log('uploadData', uploadData)

  if (error) {
    toast.add({ severity: "error", summary: "Ошибка загрузки", detail: error.message, life: 3000 });
    return false;
  } else {
    const res = supabase.storage.from(bucketName).getPublicUrl(filePath);
    data.value.image = res.data.publicUrl || ''; // Сохраняем URL изображения в объект курса
    toast.add({ severity: "success", summary: "Успех", detail: "Изображение загружено!", life: 3000 });
    return true;
  }
};

</script>

<template>
  <AdminLayout>
    <div class="container mt-4 pb-4">
      <h3 class="mb-4">Добавить курс</h3>

      <Toast />

      <PageLoader v-if="loading"/>
      <div v-else>
        <Label>Title</Label>
        <InputText type="text" v-model="data.title" placeholder="Title" class="w-full mb-3"/>

        <Label>Content</Label>
        <Editor v-model="data.content" editorStyle="height: 320px" />

        <Label class="mt-3">List</Label>
        <Editor v-model="data.list" editorStyle="height: 320px" />


        <Label class="mt-3 mb-1">Загрузить картинку на банер</Label>
        <FileUpload ref="fileupload" mode="basic" name="image" accept="image/*" :maxFileSize="1000000" :customUpload="true" @select="onFileSelect" />
        <div v-if="previewUrl" class="mt-3">
          <p>Предпросмотр:</p>
          <img :src="previewUrl" alt="Preview" style="max-width: 300px" class="h-auto rounded-md border shadow-sm" />
        </div>

        <Button label="Submit" @click="submit" class="mt-3"></Button>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped lang="scss">

</style>