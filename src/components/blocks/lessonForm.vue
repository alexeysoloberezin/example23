<script setup lang="ts">
import {ref} from "vue";
import Label from "~/src/components/ui/Label.vue";
import {useSupabase} from "~/utils/supabase";

const props = defineProps(['title','id', 'content','examples', 'content_2', 'examples_en', 'content_3', 'video', 'video_2', 'video_3', 'text', 'title_en', 'text_en','content_en', 'content_2_en', 'content_3_en', 'video_en', 'video_2_en', 'video_3_en'])
const toast = useToast();
const emit = defineEmits(['update:refresh'])
const supabase = useSupabase()
const data = ref({...props})
const loading = ref(false)

const submit = async () => {
  loading.value = true;

  let response;
  if (props.id) {
    // Если есть id, то обновляем урок
    const { data: lesson, error } = await supabase
        .from('free_lessons')
        .update(data.value)
        .eq('id', props.id);

    response = { data, error };
  } else {
    // Если нет id, то создаем новый урок
    const { data: lesson, error } = await supabase
        .from('free_lessons')
        .insert([data.value]);

    response = { data, error };
  }

  if (response.error) {
    toast.add({ severity: 'error', summary: 'Error', detail: response.error.message, life: 3000 });
    loading.value = false;
  } else {
    toast.add({ severity: 'success', summary: 'Success', detail: props.id ? 'Урок обновлен' : 'Урок успешно создан', life: 3000 });
    data.value = { title: '', content: '', content_2: '',examples: [], content_3: '', video: '', video_2: '', video_3: '', text: '', title_en: '', video_2_en: '', video_3_en: '', video_en: '', text_en: '', content_2_en: '', content_en: '', content_3_en: '' };
    emit('update:refresh');
  }
};

const deleteLesson = async () => {
  const confirmDelete = window.confirm('Вы уверены, что хотите удалить этот урок?');
  if (!confirmDelete) return; // Если пользователь не подтвердил, прерываем действие

  const { data, error } = await supabase
      .from('free_lessons')
      .delete()
      .eq('id', props.id); // Удаляем урок по id

  if (error) {
    console.error('Ошибка удаления:', error.message);
    toast.add({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
  } else {
    emit('update:refresh')
    toast.add({severity: 'success', summary: 'Success', detail: 'Успешно удалено', life: 3000});
  }
};

</script>

<template>
  <div>
    <Toast></Toast>

    <div class="less">
      <div class="" style="background: rgba(255,255,255,0.02); border-radius: 12px;padding: 20px">
        <Label>Title</Label>
        <InputText type="text" v-model="data.title" placeholder="Title" class="w-full mb-3"/>

        <Label>Content</Label>
        <Editor v-model="data.content" editorStyle="height: 320px"/>

        <Label class="mt-3">Text</Label>
        <InputText type="text" v-model="data.text" placeholder="Text" class="w-full mb-3"/>

        <Label class="mt-3">Video</Label>
        <InputText type="text" v-model="data.video" placeholder="Video" class="w-full mb-3"/>

        <Label>Content 2</Label>
        <Editor v-model="data.content_2" editorStyle="height: 320px"/>

        <Label class="mt-3">Video 2</Label>
        <InputText type="text" v-model="data.video_2" placeholder="Video 2" class="w-full mb-3"/>

        <Label>Скрытый контент</Label>
        <Editor v-model="data.content_3" editorStyle="height: 400px"/>

        <Label class="mt-3">Video 3</Label>
        <InputText type="text" v-model="data.video_3" placeholder="Video3" class="w-full mb-3"/>

        <div>
          <Textarea type="text" v-model="data.examples" placeholder="Добавить пример" class="w-full mb-3"/>
        </div>


      </div>
      <div class="" style="background: rgba(255,255,255,0.02); border-radius: 12px;padding: 20px">
          <Label>Title English</Label>
          <InputText type="text" v-model="data.title_en" placeholder="Title" class="w-full mb-3"/>

          <Label>Content English</Label>
          <Editor v-model="data.content_en" editorStyle="height: 320px"/>

          <Label class="mt-3">Text English</Label>
          <InputText type="text" v-model="data.text_en" placeholder="Text" class="w-full mb-3"/>

          <Label class="mt-3">Video English</Label>
          <InputText type="text" v-model="data.video_en" placeholder="Video" class="w-full mb-3"/>

          <Label>Content 2 English</Label>
          <Editor v-model="data.content_2_en" editorStyle="height: 320px"/>

          <Label class="mt-3">Video 2 English</Label>
          <InputText type="text" v-model="data.video_2_en" placeholder="Video 2" class="w-full mb-3"/>

          <Label>Скрытый контент English</Label>
          <Editor v-model="data.content_3_en" editorStyle="height: 400px"/>

          <Label class="mt-3">Video 3 English</Label>
          <InputText type="text" v-model="data.video_3_en" placeholder="Video3" class="w-full mb-3"/>

      </div>
    </div>
    <div class="mt-3">
      <Button :label="!id ? 'Создать' : 'Изменить'" @click="submit" class=""></Button>
      <Button label="Удалить" variant="outlined" color="danger" @click="deleteLesson" class=" ml-2"></Button>
    </div>

  </div>
</template>

<style scoped lang="scss">
.less{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}
</style>