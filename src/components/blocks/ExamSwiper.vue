<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import {useWindowSize} from "@vueuse/core";
import {Navigation} from "swiper/modules";

const { width, height } = useWindowSize()
</script>

<template>
  <div>
<!--    <div v-if="width > 1000" :key="width">-->
<!--      <div class="exam-grid">-->
<!--        <video src="/dd.mp4" autoplay muted loop></video>-->
<!--        <img src="/ex_2.jpg" class="rounded" alt="">-->
<!--        <img src="/ex_3.jpg" class="rounded" alt="">-->
<!--        <img src="/ex_4.jpg" class="rounded" alt="">-->
<!--        <img src="/ex_8.jpg" class="rounded" alt="">-->
<!--        <img src="/ex_5.jpg" class="rounded" alt="">-->
<!--        <img src="/ex_6.jpg" class="rounded" alt="">-->
<!--        <img src="/ex_7.jpg" class="rounded" alt="">-->
<!--        <img src="/ex_22.jpg" class="rounded" alt="">-->
<!--        <img src="/ex_23.jpg" class="rounded" alt="">-->
<!--      </div>-->
<!--    </div>-->
    <div  class="examSwiper">
      <swiper
          :slides-per-view="1.1"
          :loop="true"
          :autoplay="{ delay: 3000 }"
          :space-between="12"
          :modules="[Navigation]"
          :navigation="{ nextEl: '.custom-next-2', prevEl: '.custom-prev-2' }"
          :centeredSlides="true"
          :breakpoints="{
            480: { slidesPerView: 2, spaceBetween: 10, centeredSlides: false }, // Для маленьких экранов центрирование отключаем
            768: { slidesPerView: 3, spaceBetween: 12, centeredSlides: false }, // На планшетах включаем
            1024: { slidesPerView: 4, spaceBetween: 12, centeredSlides: false } // Десктопы
          }"
      >
        <swiper-slide> <video src="/ex_1.MOV" autoplay muted loop playsinline webkit-playsinline></video>  </swiper-slide>
        <swiper-slide> <img src="/ex_2.jpg" class="rounded" alt="">   </swiper-slide>
        <swiper-slide>   <img src="/ex_3.jpg" class="rounded" alt="">  </swiper-slide>
        <swiper-slide>  <img src="/ex_4.jpg" class="rounded" alt="">  </swiper-slide>
        <swiper-slide>  <img src="/ex_8.jpg" class="rounded" alt="">  </swiper-slide>
        <swiper-slide>  <img src="/ex_5.jpg" class="rounded" alt="">  </swiper-slide>
        <swiper-slide>   <img src="/ex_6.jpg" class="rounded" alt=""> </swiper-slide>
        <swiper-slide>   <img src="/ex_7.jpg" class="rounded" alt=""> </swiper-slide>
        <swiper-slide>  <img src="/ex_22.jpg" class="rounded" alt="">  </swiper-slide>
        <swiper-slide>   <img src="/ex_23.jpg" class="rounded" alt="">  </swiper-slide>

        <div class="custom-prev-2 sw-arrow swiper-button-prev"></div>
        <div class="custom-next-2 sw-arrow swiper-button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>