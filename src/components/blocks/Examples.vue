<script setup lang="ts">
import Image from 'primevue/image';

const props = defineProps(['examples'])

const getExamples = computed(() => {
  if (!props.examples) return []; // Если undefined или null — вернуть пустой массив

  if (typeof props.examples === 'string') {
    return props.examples
        .replace(/\[|\]/g, '') // Убираем квадратные скобки
        .replace(/'/g, '') // Убираем кавычки
        .split(', '); // Разделяем по запятым
  }

  if (Array.isArray(props.examples)) {
    return props.examples.map(String); // Если это массив — просто приводим элементы к строке
  }

  return []; // Если `examples` — не строка и не массив, возвращаем пустой массив
});

const isVideo = (fileName: string) => {
  return fileName.toLowerCase().endsWith(".mp4") || fileName.toLowerCase().endsWith(".mov");
};

const isFile = (fileName: string) => {
  return fileName.toLowerCase().endsWith(".docx")
};
</script>

<template>
  <div>
    <h3 class="mb-4">{{ $t('course.example') }}</h3>
  </div>
  <div v-if="Array.isArray(getExamples)" class="els example-xx">
    <div v-for="el in getExamples" :key="el" class="els-item">
      <template v-if="isVideo(el)">
        <video :src="'/' + el" controls class="els-video"></video>
      </template>
      <template v-else-if="isFile(el)">
        <a :href="'/' + el" :download="'/' + el" class="els-item-download">
          <div>Файл</div>
          <img src="/donwload.png" alt="">
        </a>
      </template>
      <template v-else>
        <Image :src="'/' + el" :image-style="'max-height: 400px;max-width: 300px'" class="els-img" preview/>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">

.els {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;

  &-img {
    max-width: 100%;
    border-radius: 8px;
  }
  &-item{
    @media (max-width: 450px) {
      width: 100%;
    }
  }

  &-video {
    height: 100%;
    object-fit: cover;
    max-height: 400px;
    max-width: calc(25vw - 100px);
    border-radius: 8px;
    @media (max-width: 1000px) {
      max-width: 100%;
      min-height: 180px;
    }
  }
}
</style>