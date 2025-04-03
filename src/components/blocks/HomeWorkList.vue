<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSupabase} from '~/utils/supabase';

const homeworks = ref<any>([]);
const supabase = useSupabase()
onMounted(async () => {

  const { data, error } = await supabase
      .from('homeworks')
      .select('*')
      .order('created_at', { ascending: false });

  if (error) {
    console.error('Ошибка загрузки домашних заданий:', error.message);
  } else {
    homeworks.value = data;
  }
});
</script>

<template>
  <div>
    <h2>Домашние задания</h2>
    <ul>
      <li v-for="hw in homeworks" :key="hw.id">
        <p>Комментарий: {{ hw.comment }}</p>
        <a :href="hw.file_url" target="_blank">Скачать файл</a>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">

</style>