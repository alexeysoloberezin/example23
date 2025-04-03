<script setup lang="ts">
import {defineAsyncComponent} from 'vue';
import {useWindowSize} from "@vueuse/core";

const Header = defineAsyncComponent(() => import("~/src/components/Header.vue"));
const MainVideoImage = defineAsyncComponent(() => import("~/src/components/blocks/MainVideoImage.vue"));
const HomePageScound = defineAsyncComponent(() => import("~/src/components/blocks/HomePageScound.vue"));

const {width, height} = useWindowSize()
const {locale} = useI18n()
const visible = ref(false)
const popupVid = computed(() => {
  return locale.value === 'en' ? 'https://kinescope.io/pWweo59LZwyys9hMvtMDb6' : 'https://kinescope.io/sj5KMSd9j5BmC8g5xCoaaW'
})

const showSection = ref(false)

const onScroll = () => {
  if (window.scrollY > 50) { // Если пользователь проскроллил 50px
    showSection.value = true
    window.removeEventListener('scroll', onScroll) // Удаляем обработчик после срабатывания
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll) // Удаляем обработчик при выходе со страницы
})

const isClient = ref(false);

onMounted(() => {
  isClient.value = true;
});
</script>

<template>
  <div>
    <NuxtLink :to="`/${locale || 'en'}/app/courses/view/1/1?trial=true`" class="btn mainBtn">
      {{ $t('landing.btns.takeCourse') }}
    </NuxtLink>

    <Header/>

    <div class="mainBlock">
      <MainVideoImage />

      <div class="container">
        <div class="mainBlock-info">
          <div class="boldText mb-3">
            {{ $t('landing.title') }}
          </div>
<!--          <div class="subtitle mb-2">-->
<!--            {{ $t('landing.txt_33') }}-->
<!--          </div>-->
          <div class="subtitle-sm mb-2">{{ $t('landing.text1') }}</div>
          <div class="subtitle-sm mb-2">{{ $t('landing.text2') }}</div>
          <div class="subtitle-sm mb-2">{{ $t('landing.text3') }}</div>
          <!--          <img class="mainBlock-image" src="/aboutUs.png" alt="">-->


          <!--          <div class="mainBlock-xio ">-->
          <!--            <div>-->
          <!--              <div class="main-btns gap-2">-->
          <!--&lt;!&ndash;                <button class="btn" @click="visible = true">&ndash;&gt;-->
          <!--&lt;!&ndash;                  {{ $t('landing.btns.trailer') }}&ndash;&gt;-->
          <!--&lt;!&ndash;                </button>&ndash;&gt;-->

          <!--&lt;!&ndash;                <Dialog v-model:visible="visible" modal header="">&ndash;&gt;-->
          <!--&lt;!&ndash;                 <iframe class="popupVideo" :src="popupVid" allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;" frameborder="0" allowfullscreen ></iframe>&ndash;&gt;-->

          <!--&lt;!&ndash;                </Dialog>&ndash;&gt;-->
          <!--&lt;!&ndash;                <NuxtLink :to="`/${locale || 'en'}/app/register`" class="mainBlock-stick">{{ $t('landing.sticker') }}&ndash;&gt;-->
          <!--&lt;!&ndash;                </NuxtLink>&ndash;&gt;-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <div class="mainVideo mt-2" @click="visible = true" style="position: relative">
            <button class="play-button"
                    style="position:absolute;top: 50%;left:50%;transform:translate(-50%,-50%);background: transparent;border: none;font-size: 40px;border-radius: 50%;cursor:pointer;">
              ▶️
            </button>
            <NuxtImg class=""
                     format="webp"
                     loading="eager"
                     fetchpriority="high"
                     fit="cover"
                     style="width: 100%;height: 100%;object-fit: cover;border-radius: 15px;"
                     src="/mainVideoPreview.jpg" alt=""
            />
          </div>
          <Dialog v-model:visible="visible" modal header="">
            <iframe class="popupVideo" :src="popupVid"
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                    frameborder="0" allowfullscreen></iframe>
          </Dialog>
        </div>
      </div>

      <div class="mainShadow"></div>
      <div class="gradient-bottom"></div>
    </div>

    <br />
    <br />
    <div v-show="!showSection" class="spacer">
      <br/>
      <br/>
      <br/>
    </div>
    <div v-if="showSection">
      <HomePageScound/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mainVideo {
  aspect-ratio: 16/9;
  width: 550px;
  border-radius: 20px;
  max-width: 80vw;
  @media (max-height: 600px) {
    width: 420px;
  }
  @media (max-width: 600px) {
    max-width: 100%;
    text-align: center;
  }
}
</style>