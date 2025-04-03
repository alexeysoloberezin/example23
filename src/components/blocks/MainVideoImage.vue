<template>
  <div>
    <NuxtImg
        v-if="isMobile"
        src="/test.jpg"
        class="imageFon mainImage opacity-50"
        alt="Background"
        format="webp"
        loading="eager"
        fetchpriority="high"
        fit="cover"
    />

    <video
        v-else
        class="imageFon"
        autoplay
        muted
        playsinline webkit-playsinline
        loop
    >
      <source :src="videoWeb" type="video/webm">
      <source :src="videoMov" type="video/mp4">
      Ваш браузер не поддерживает видео.
    </video>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import videoWeb from '../../assets/main.webm';
import videoMov from '../../assets/main.mp4';

const isMobile = ref(window?.innerWidth < 3000 ? window.innerWidth <= 700 : true);

const checkScreen = () => {
  isMobile.value = window.innerWidth <= 700;
};

onMounted(() => {
  window.addEventListener("resize", checkScreen);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreen);
});
</script>

<style scoped>
.mainImage{

}
</style>
