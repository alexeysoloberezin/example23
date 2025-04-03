<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';

const props = defineProps(['isMob'])
</script>

<template>
  <div>
    <div class="wrp">
      <div class="card">
        <div class="card-header">{{ $t('dashboard.orders.title') }} <span class="icon">{{ $t('dashboard.orders.icon') }}</span></div>
        <p class="value">{{ $t('dashboard.orders.value') }}</p>
        <p class="status">{{ $t('dashboard.orders.status') }}</p>
      </div>
      <div class="card">
        <div class="card-header">{{ $t('dashboard.reviews.title') }} <span class="icon">{{ $t('dashboard.reviews.icon') }}</span></div>
        <p class="value">{{ $t('dashboard.reviews.value') }}</p>
      </div>
      <div class="card">
        <div class="card-header">{{ $t('dashboard.portfolio.title') }} <span class="icon">{{ $t('dashboard.portfolio.icon') }}</span></div>
        <p class="value">{{ $t('dashboard.portfolio.value') }}</p>
      </div>
      <div class="card">
        <div class="card-header">{{ $t('dashboard.duration.title') }} <span class="icon">{{ $t('dashboard.duration.icon') }}</span></div>
        <p class="value">{{ $t('dashboard.duration.value') }}</p>
        <p class="status">{{ $t('dashboard.duration.status') }}</p>
      </div>
    </div>


<!--    <div  class="stats-slider">-->
<!--      <swiper-->
<!--          :slides-per-view="'auto'"-->
<!--          :autoplay="{ delay: 0, disableOnInteraction: false }"-->
<!--          :space-between="12"-->
<!--          :speed="5000"-->
<!--          :loop="true"-->
<!--          class=""-->
<!--      >-->
<!--        <swiper-slide><img class="rounded" src="/lp_1.jpg" alt=""></swiper-slide>-->
<!--        <swiper-slide><img class="rounded" src="/lp_2.jpg" alt=""></swiper-slide>-->
<!--        <swiper-slide><img class="rounded" src="/lp_3.jpg" alt=""></swiper-slide>-->
<!--        <swiper-slide><img class="rounded" src="/lp_4.jpg" alt=""></swiper-slide>-->
<!--        <swiper-slide><img class="rounded" src="/ex_10.jpg" alt=""></swiper-slide>-->
<!--        <swiper-slide><img class="rounded" src="/ex_11.jpg" alt=""></swiper-slide>-->
<!--        <swiper-slide><img class="rounded" src="/ex_9.jpg" alt=""></swiper-slide>-->
<!--        <swiper-slide>-->
<!--          <video src="/ex_1.MOV" class="rounded"  controls></video>-->
<!--        </swiper-slide>-->
<!--      </swiper>-->
<!--    </div>-->

  </div>
</template>

<style scoped lang="scss">
.images {
  img {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    object-fit: cover;
  }


  &-info {
    display: grid;
    margin-top: 10px;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;

  }

  &-box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 330px;
    @media (max-width: 1600px) {
      grid-template-rows: 280px;
    }
    gap: 10px;

    video {
      max-width: 100%;
      height: 330px;
      border-radius: 12px;
      object-fit: cover;
      @media (max-width: 1600px) {
        height: 280px;
      }
    }

    img {
      object-fit: cover;
      height: 330px;
      border-radius: 12px;
      @media (max-width: 1600px) {
        height: 280px;
      }
    }
  }

  &-boxTwo {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}

.images .image-small {
  height: 300px;
}

.wrp {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 10px;
  gap: 10px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.card {
  background-color: #0d132e;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 8px;
  @media (max-width: 700px) {
    padding: 16px;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center !important;
  width: 100%;
  font-size: 14px;
  text-align: left;
  color: #a1aabd;
}

.icon {
  width: 24px;
  height: 24px;
}

.value {
  font-size: 24px;
  text-align: left;
  font-weight: 600;
}

.status {
  color: #10b981;
  text-align: left;
  font-size: 14px;
}
</style>