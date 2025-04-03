<script setup lang="ts">
import ExamSwiper from "~/src/components/blocks/ExamSwiper.vue";
import { Navigation } from 'swiper/modules';
import LandingCard from "~/src/components/ui/landingCard.vue";
import LandingCardTransparent from "~/src/components/ui/landingCardTransparent.vue";
import Stats from "~/src/components/blocks/Stats.vue";
import InfoCards from "~/src/components/ui/InfoCards.vue";
import {useWindowSize} from "@vueuse/core";
import 'swiper/css';
import 'swiper/css/navigation';
import {Swiper, SwiperSlide} from "swiper/vue";
import AboutMe from "~/src/components/blocks/AboutMe.vue";

const {width, height} = useWindowSize()

const isMob = computed(() => {
  return width.value < 1600
})

const {locale} = useI18n()

</script>

<template>
  <section class="aboutUs" id="examples">
    <div class="container">
      <h2>{{ $t('landing.aboutUs.title') }}</h2>
      <div class="underTitle">{{ $t('landing.aboutUs.subtitle') }}
      </div>
      <Stats :isMob="isMob" :key="width"></Stats>
    </div>
    <div class="container">
      <div class="examSwiper">
        <swiper
            :slides-per-view="1.1"
            :loop="true"
            :modules="[Navigation]"
            :navigation="{ nextEl: '.custom-next', prevEl: '.custom-prev' }"
            :space-between="12"
            :centeredSlides="true"
            :breakpoints="{
                  480: { slidesPerView: 2, spaceBetween: 10, centeredSlides: false },
                  768: { slidesPerView: 3, spaceBetween: 12, centeredSlides: false },
                  1024: { slidesPerView: 4, spaceBetween: 12, centeredSlides: false }
                }"
        >
          <swiper-slide><img src="/lp_1.jpg" alt="Image" preview/></swiper-slide>
          <swiper-slide><img src="/lp_2.jpg" alt="Image" preview/></swiper-slide>
          <swiper-slide><img src="/lp_3.jpg" alt="Image" preview/></swiper-slide>
          <swiper-slide><img src="/lp_4.jpg" alt="Image" preview/></swiper-slide>
          <swiper-slide><img src="/ex_10.jpg" alt="Image" preview/></swiper-slide>
          <swiper-slide><img src="/ex_11.jpg" alt="Image" preview/></swiper-slide>
          <swiper-slide><img src="/ex_9.jpg" alt="Image" preview/></swiper-slide>
          <swiper-slide><video muted src="/pls_1.MOV" controls></video></swiper-slide>

          <div class="custom-prev sw-arrow swiper-button-prev"></div>
          <div class="custom-next sw-arrow swiper-button-next"></div>
          <!--            <swiper-slide>-->
          <!--              <video src="/anime.MOV"  autoplay muted loop></video>-->
          <!--            </swiper-slide>-->
        </swiper>
      </div>
    </div>

    <NuxtLink :to="`/${locale || 'en'}/app/register`" class="btn mt-3">
      {{ $t('landing.btns.takeCourse') }}
    </NuxtLink>
  </section>

  <section class="forPeople relative" id="for">
    <div class="gradient-top"></div>
    <div class="gradient-bottom"></div>

    <div class="py-3">
      <div class="container">
        <div class="darkenOverlay"></div>
        <img src="/bg1.jpg" class="imageFon" alt="">

        <div class="relative z-5 text-center">
          <h2>{{ $t('landing.for.title') }}</h2>
          <div class="underTitle">
            {{ $t('landing.for.subtitle') }}
          </div>

          <div class="grid ">
            <div v-for="el in $tm('landing.for.cards')" :key="el?.title" class="lg:col-6 col-12">
              <LandingCard :title="el?.title">
                {{ el?.text }}
              </LandingCard>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

  <section id="programm" class="programm">
    <div class="container">
      <h2 class="text-center mb-4">{{ $t('landing.programm.title') }}</h2>
      <div class="examples">
        <template v-for="(el, indx) in $tm('landing.programm.cards')" :key="el?.title">
          <LandingCardTransparent  @update:click="clickVideo" :title="el?.title" :time="el?.time"
                                   :index="indx + 1" :list="el?.list" :text="el?.text">
          </LandingCardTransparent>
        </template>
      </div>

      <div class="flex justify-content-center mt-4 w-full">
        <NuxtLink :to="`/${locale || 'en'}/app/register`" class="btn">
          {{ $t('landing.btns.takeCourse') }}
        </NuxtLink>
      </div>
    </div>
  </section>

  <section class="total">
    <div class="container">
      <h3 class="text-center">{{ $t('landing.result.title') }}</h3>

      <InfoCards/>
    </div>
  </section>


  <section class="exam" id="stud">
    <div class="container">
      <h3 v-html="$t('landing.examples.title')" class="text-center mb-4">
      </h3>

      <ExamSwiper/>
    </div>
  </section>

  <div>
    <AboutMe />
  </div>

  <Footer/>
</template>

<style scoped lang="scss">
.aboutUs {
  text-align: center;

}

.total {

}

.exam {
  &-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
    margin-top: 20px;

    video, img {
      width: 100%;
      height: 100%;
      max-width: 100%;
      object-fit: cover;
      border-radius: 12px;
    }
  }

}

.total-wrp {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.examples {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }

  &-card {
    height: 100%;
  }
}

.forPeople {
  min-height: 500px;
}
</style>