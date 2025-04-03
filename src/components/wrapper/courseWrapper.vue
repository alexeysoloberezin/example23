<script setup lang="ts">

import PageLoader from "~/src/components/ui/PageLoader.vue";
import HomeWork from "~/src/components/blocks/HomeWork.vue";
import Examples from "~/src/components/blocks/Examples.vue";
import {useSupabase} from "~/utils/supabase";
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import LazyVideo from "~/src/components/LazyVideo.vue";
import {useUserStore} from "~/store/userStora";
import {useWindowSize} from "@vueuse/core";
import {Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/vue";
import 'swiper/css';

const supabase = useSupabase()
const props = defineProps(['lessons', 'togglePanel', 'lesson', 'activeLesson', 'loading'])
const emits = defineEmits(['setTogglePanel'])
const {t} = useI18n()
const route = useRoute()
const courseId = route.params.courseId
const lessonId = route.params.lessonId
const toast = useToast()
const {locale} = useI18n()
const userStore = useUserStore()
const {user, finishedLessons} = storeToRefs(userStore)
const {incrementFinishedLesson} = userStore
const {width, height} = useWindowSize()
const fullLessons = computed(() => {
  return props.lessons
})

const getLesson = computed(() => {
  if (isRu.value) {
    return {
      ...props.lesson,
      video: props.lesson.video,
      video_2: props.lesson.video_2,
      video_3: props.lesson.video_3,
      title: props.lesson.title,
      text: props.lesson.text,
      content: props.lesson.content,
      content_2: props.lesson.content_2,
      content_3: props.lesson.content_3,
    }
  }
  return {
    ...props.lesson,
    video: props.lesson.video_en,
    video_2: props.lesson.video_2_en,
    video_3: props.lesson.video_3_en,
    title: props.lesson.title_en,
    text: props.lesson.text_en,
    content: props.lesson.content_en,
    content_2: props.lesson.content_2_en,
    content_3: props.lesson.content_3_en,
  }
})


const isRu = computed(() => locale.value === 'ru')

const isBlock = (lesson: number) => {
  if (lesson === 1) {
    return false
  }
  if (!user.value) {
    return true
  }
  if (user.value.hasSub === false) {
    return true
  }
  if (finishedLessons.value == null) {
    return true
  }
  if (finishedLessons.value + 1 >= lesson) {
    return false
  }
  return true;
}


const goTo = (lessonId: number) => {
  if (lessonId === 1) {
    navigateTo(`/${locale.value || 'en'}/app/courses/view/${courseId}/${lessonId}`)
    return
  }
  if (!user.value) {
    navigateTo(`/${locale.value || 'en'}/app/register`)
    return
  }
  if (user.value.hasSub === false) {
    navigateTo(`/${locale.value || 'en'}/app/buy/15`)
    return
  }

  if (isBlock(lessonId)) {
    toast.add({severity: 'error', summary: t('course.message'), detail: t('course.message_2'), life: 3000});
    return
  }
  navigateTo(`/${locale.value || 'en'}/app/courses/view/${courseId}/${lessonId}`)
}

const loadingLesson = ref(false)
const setNextLesson = async () => {
  loadingLesson.value = true
  try {
    const fLessons = typeof finishedLessons.value === "number" ? finishedLessons.value + 1 : 1;
    const {data, error} = await supabase
        .from("profiles")
        .update({finishedLessons: fLessons}) // Прибавляем 1
        .eq("id", user.value.id) // Находим пользователя по ID
        .select();

    if (error) {
      toast.add({severity: 'error', summary: 'Error', detail: 'Ошибка при переходе на след. урок', life: 3000});
      return null;
    }

    incrementFinishedLesson()
    navigateTo(`/${locale.value || 'en'}/app/courses/view/${courseId}/${fLessons + 1}`)
    return data; // Возвращаем обновленный профиль
  } catch (err) {
    toast.add({severity: 'error', summary: 'Error', detail: 'Ошибка при переходе на след. урок', life: 3000});
    return null;
  } finally {
    loadingLesson.value = false
  }
}

const mobileToggleMenu = ref(false)
const mobileToggle = computed(() => {
  if (width.value > 1250) {
    return true
  }
  return mobileToggleMenu.value
})

const setToggle = () => {
  mobileToggleMenu.value = !mobileToggleMenu.value
  emits('setTogglePanel', !props.togglePanel)
}
</script>

<template>
  <Toast/>
  <PageLoader v-if="loading"></PageLoader>
  <div v-else class="courseView" :class="togglePanel ? 'active' : ''">
    <div v-if="width > 1250" :class="` ${!mobileToggleMenu ? 'mobileHidden' : ''} courseView-panel scroll-container bg2`">
      <Button
          :icon="`pi ${togglePanel ? 'pi-arrow-left' : 'pi-arrow-right'}`"
          @click="setToggle" variant="text" aria-label="Bookmark"/>
      <br/>
        <div v-for="(el, inx) in fullLessons" :key="el.id"
             :style="{position: 'relative'}" class="w-full" @click="goTo(el.id)">
          <template v-if="togglePanel">
            <Fieldset :legend="`${$t('courseNumber')} ${el.id}`" :class="activeLesson === el.id + '' ? 'active w-full' : 'w-full'">
              <div v-html="isRu ? el.title : el.title_en" class="font-semibold text-sm opacity-70"
                   :style="{color: inx < 8 ? 'white' : '#0f9739'}">
              </div>

              <div v-if="isBlock(el.id)" class="courseView-lock">
                <img src="/lock.svg" class="" alt="">
              </div>
            </Fieldset>
          </template>
          <template v-else>
            <Button :label="isBlock(el.id) ? '' : el.id" :icon="isBlock(el.id) ? 'pi pi-lock' : undefined"
                    :variant="activeLesson === el.id + '' ? undefined : 'text'"/>
          </template>
        </div>
    </div>
    <div v-else class="mobileSwiper">
      <swiper
          :slides-per-view="1.4"
          :autoHeight="true"
          :space-between="12"
          :breakpoints="{
            480: { slidesPerView: 2.2, spaceBetween: 10, centeredSlides: false }, // Для маленьких экранов центрирование отключаем
            768: { slidesPerView: 3.4, spaceBetween: 12, centeredSlides: false }, // На планшетах включаем
            1024: { slidesPerView: 4, spaceBetween: 12, centeredSlides: false } // Десктопы
          }"
      >
        <swiper-slide v-for="(el, inx) in fullLessons" :key="el.id" class="relative mobileSwiper-slide">
          <Fieldset :legend="`${$t('courseNumber')} ${el.id}`" :class="activeLesson === el.id + '' ? 'active w-full' : 'w-full'">
            <div v-html="isRu ? el.title : el.title_en" class="font-semibold text-sm opacity-70"
                 :style="{color: inx < 8 ? 'white' : '#0f9739'}">
            </div>

            <div v-if="isBlock(el.id)" class="courseView-lock">
              <img src="/lock.svg" class="" alt="">
            </div>
          </Fieldset>
        </swiper-slide>
      </swiper>
    </div>
    <div v-if="getLesson" class="">
      <div class="courseView-main scroll-container bg2 content ">
        <!--        {{ route.params.id }}-->
        <div class="courseView-head">
          <h3 class="">{{ getLesson.title }}</h3>
          <div class="flex sm:flex-row flex-column align-center gap-1">
            <NuxtLink v-if="getLesson.id > 1" :to="`/${locale || 'en'}/app/courses/view/${courseId}/${getLesson.id - 1}`">
              <Button :label="$t('nav.prevLesson')" variant="outlined" icon="pi pi-arrow-left"
                      style="text-wrap: nowrap"></Button>
            </NuxtLink>

            <NuxtLink v-if="(lessons.length > getLesson.id) && (finishedLessons + 1 > getLesson.id)"
                      :to="`/${locale || 'en'}/app/courses/view/${courseId}/${getLesson.id + 1}`">
              <Button :label="$t('nav.nextLesson')" variant="outlined" icon="pi pi-arrow-right"
                      style="text-wrap: nowrap" iconPos="right"></Button>
            </NuxtLink>
          </div>
        </div>

        <div v-if="getLesson.video"
             style="position: relative;border-radius: 15px;overflow: hidden;margin: 25px 0; padding-top: 55%; width: 100%">
          <iframe :src="getLesson.video"
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
                  frameborder="0" allowfullscreen
                  style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"></iframe>
        </div>

        <!--        <iframe class="video mb-4" src="https://www.youtube.com/embed/YAi9eNvSJK4?si=M7yYni52u5brw7M0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>-->


        <div v-if="getLesson.content" class="lesson-content" v-html="getLesson.content"></div>


        <div v-if="getLesson.content_3" class="mb-3">
          <Accordion value="1">
            <AccordionPanel value="0">
              <AccordionHeader>{{ $t('action.fullContent') }}</AccordionHeader>
              <AccordionContent>
                <div class="lesson-content pt-2" v-html="getLesson.content_3"></div>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>

        <div v-if="getLesson.id === 5 && locale === 'en'">
          <div class="lesson-content ">
            <h2><strong>Tutorial for Changing the Language on the MyHeritage Website:</strong></h2><br/>
            <div>1. Open the MyHeritage page.</div>
            <div> 2. In the top right corner, click on "Select Language."<br/></div>
            <div class="mb-3">3. Choose English or any other language from the list.<br/></div>

            <video class="video" controls :src="'/ex_22.mp4'">

            </video>
          </div>
        </div>

        <!--        <div v-if="getLesson.id === 5">-->
        <!--          <div class="leo-grid">-->
        <!--            <LazyVideo v-for="el in 4" :key="'lesson_5_v-' + el" :is-controlled="true" :poster="`/vd_${el}_preview.png`" :video-src="`/vd_${el}.MOV`" />-->
        <!--          </div>-->
        <!--        </div>-->



        <div v-if="getLesson.id !== 10 && getLesson.id !== 1" class="examples">
          <Examples :examples="getLesson.examples"></Examples>

          <div v-if="getLesson.id === 7" class="mb-4">
            <div class="leo-grid-3 mb-4">
              <div class="grow" v-for="el in 3" :key="'lesson_5_v-' + el">
                <LazyVideo :initial-size="true" :is-controlled="true" :cover="true" :poster="`/vd_${el}_preview.png`"
                           :video-src="`/vd_${el}.MOV`"/>
              </div>
            </div>
            <LazyVideo :initial-size="true" :is-controlled="true" :poster="`/vd_4_preview.png`"
                       :video-src="`/vd_4.MOV`"/>


            <h4 class="mt-3">{{ $t('course.exampleOfScene') }}</h4>
            <a :href="locale === 'en' ? '/doc_en.docx' : '/doc.docx'"
               :download="locale === 'en' ? '/doc_en.docx' : '/doc.docx'" class="els-item-download mb-2 mt-2">
              <div>{{ $t('course.download') }}</div>
              <img src="/donwload.png" alt="">
            </a>

            <h4 class="mb-2">{{ $t('course.audioStory') }}</h4>
            <audio controls>
              <source :src="locale === 'en' ? '/audio_en.mp3' : '/audio.mp3'" type="audio/mpeg"/>
              Ваш браузер не поддерживает аудио.
            </audio>

            <h3 class="mt-3 mb-3">{{ $t('course.hailuo') }}</h3>
          </div>
        </div>

        <div v-if="getLesson.id === 8">
          <div class="leo-grid">
            <div v-if="locale === 'ru'"
                 style="position: relative; padding-top: 57.14%;border-radius: 15px;overflow: hidden; width: 100%">
              <iframe src="https://kinescope.io/embed/671ZDHWLbPEPEyZvyGnMNy"
                      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                      frameborder="0" allowfullscreen
                      style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"></iframe>
            </div>
            <div v-else
                 style="position: relative; padding-top: 57.14%;border-radius: 15px;overflow: hidden; width: 100%">
              <iframe src="https://kinescope.io/embed/9aTn99GkoEHdCdkz4SeTxS"
                      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                      frameborder="0" allowfullscreen
                      style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"></iframe>
            </div>
            <div style="position: relative; padding-top: 60%;border-radius: 15px;overflow: hidden; width: 100%">
              <iframe src="https://kinescope.io/embed/q53372aHKChnmv8ZVeM8tg"
                      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                      frameborder="0" allowfullscreen
                      style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"></iframe>
            </div>
          </div>
        </div>

        <div v-if="getLesson.video_2"
             style="position: relative;border-radius: 15px;overflow: hidden;margin: 25px 0; padding-top: 55%; width: 100%">
          <iframe :src="getLesson.video_2"
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
                  frameborder="0" allowfullscreen
                  style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"></iframe>
        </div>

        <div v-if="getLesson.id === 7" class="mb-4 mt-4">
          <video class="mb-2" src="/epo.MOV" controls style="width: 100%;"></video>

          <div style="position: relative; padding-top: 216.22%; width: 100%"><iframe src="https://kinescope.io/embed/iH2zCji5wjfjAcBYKwsnzE" allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;" frameborder="0" allowfullscreen style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"></iframe></div>
        </div>


        <div v-if="getLesson.video_3"
             style="position: relative;border-radius: 15px;overflow: hidden;margin: 25px 0; padding-top: 55%; width: 100%">
          <iframe :src="getLesson.video_3"
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
                  frameborder="0" allowfullscreen
                  style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"></iframe>
        </div>


        <div v-if="getLesson.id === 6" class="leo-grid">
          <div>
            <h4 class="mb-1 ex-22">{{ $t('course.def') }}</h4>
            <Image :src="'/les_6_4.jpg'" preview/>
          </div>
          <div>
            <h4 class="mb-1 ex-22">{{ $t('course.ex') }} 1:</h4>
            <Image :src="'/les_6_5.jpg'" preview/>
          </div>
          <div>
            <h4 class="mb-1 ex-22">{{ $t('course.ex') }} 2:</h4>
            <Image :src="'/les_6_6.jpg'" preview/>
          </div>
          <div>
            <h4 class="mb-1 ex-22">{{ $t('course.ex') }} 3:</h4>
            <Image :src="'/les_6_7.jpg'" preview/>
          </div>
        </div>

        <div v-if="getLesson.content_2" class="mb-4"
             style="background: rgba(255,255,255,0.02); border-radius: 12px;padding: 20px">
          <div v-if="getLesson.content_2" class="lesson-content" v-html="getLesson.content_2"></div>
        </div>

        <div v-if="finishedLessons + 1 === getLesson.id && finishedLessons !== 9 && !!user && user?.hasSub">
          <Button label="Следующий урок" :disabled="loadingLesson" :loading="loadingLesson" class="w-full mb-3 mt-2"
                  @click="setNextLesson"></Button>
        </div>

        <template v-if="getLesson.id !== 10 && !!user && user?.hasSub">
          <HomeWork :lesson-id="lessonId"></HomeWork>
        </template>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.leo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 14px;
  margin-top: 30px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 450px) {
    grid-template-columns: 1fr;
  }
}
.mobileSwiper{

}
.leo-grid-3 {
  gap: 14px;
  margin-top: 20px;
  min-height: 578px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}
.ex-22{
  @media (min-width: 450px) {
    min-height: 45px;
  }
}
.courseView {
  padding: 10px;
  @media (min-width: 1250px) {
    display: grid;
    height: calc(100dvh - 65px);
    grid-template-columns: 80px 1fr;
  }

  &.active {
    @media (min-width: 1250px) {
      grid-template-columns: 340px 1fr;
    }
  }

  &-head {
    display: flex;
    flex-direction: column-reverse;
    gap: 15px;
    margin-bottom: 20px;

    justify-content: space-between;
  }

  &-text {
    font-size: 13px;
    line-height: 1.2;
    opacity: 0.7;
    margin-top: 5px;
  }

  &-main {
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    position: relative;
    overflow-y: auto;
    z-index: 4;
    @media (max-width: 1250px) {
      margin-top: 10px;
      padding: 10px;
    }
    @media (min-width: 1250px) {
      height: calc(100dvh - 65px);
      margin-left: 15px;
    }

  }

  &-panel {
    border: 1px solid rgba(255, 255, 255, 0.07);
    overflow-y: auto;
    position: relative;
    z-index: 4;
    border-radius: 12px;
    //border-right: 1px solid rgba(255, 255, 255, 0.2);
    //border-left: 1px solid rgba(255, 255, 255, 0.2);
    padding: 0 20px;
    @media (min-width: 1250px) {
      height: calc(100dvh - 65px);
    }


    &.mobileHidden {
      @media (max-width: 1250px) {
        flex-wrap: wrap;
        display: flex;
      }
    }
  }
}
.mobileSwiper-slide{
  //min-height: 200px;
}
</style>