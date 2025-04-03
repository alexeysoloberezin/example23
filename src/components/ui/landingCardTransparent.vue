<script setup lang="ts">
import LazyVideo from "~/src/components/LazyVideo.vue";
import Message from 'primevue/message';

const {title, index, list, text} = defineProps(['title', 'list', 'index', 'text', 'showVideo', 'time'])
const emit = defineEmits(['update:click'])
const {locale} = useI18n()

const getVideoLink = (index: number) => {
  if(locale.value === 'en'){
    return `/preview_${index}_en.mp4`
  }
  return `/preview_${index}.MOV`
}
</script>

<template>
  <div class="card myCard">
    <LazyVideo  @update:click="(ev) => emit('update:click', ev)" :poster="`/poster${index}.png`" :isControlled="true" :video-src="getVideoLink(index)" :className="'card-video'" />
    <div class="card-tag font2">{{ $t('courseNumber') }} {{ index }}</div>
    <div class="card-title font2 mt-3" v-html="title"></div>
    <div class="grow">
      <div v-html="text"></div>
      <ul class="mt-2">
        <li v-for="(el, i) in list" class="mb-2">
          {{i + 1}}. {{ el }}
        </li>
      </ul>
    </div>

    <div class="flex sm:flex-row flex-column  justify-content-between sm:align-items-center gap-1 w-full">
      <Message size="small">{{ $t('landing.timeCourse') }}</Message>
      <Message size="small">{{ time }}</Message>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card{
  position: relative;
  border-radius: 10px;
  border: 2px solid #434343;
  display: flex;
  flex-direction: column;
  padding: 20px;
  @media (max-width: 600px) {
    padding: 14px;
  }

  .grow{
    flex-grow: 1;
    margin-bottom: 10px;
  }
  &-video{
    max-width: 100%;
    width: 100%;
    border-radius: 8px;
    margin-bottom: 15px;
  }
  &-title{
    font-size: clamp(16px, 2.5vw, 28px);
    padding-right: 100px;
    line-height: 1.1;

    margin-bottom: 15px;
  }
  &-tag{
    background: #6187F2;
    position: absolute;
    border-radius: 50px;
    padding: 6px 12px;
    font-size: 16px;
    letter-spacing: 0.4px;
    font-weight: 300;
    top: 5px;
    right: 14px;
    @media (max-width: 600px) {
      font-size: 14px;
      padding: 4px 9px;
    }
  }
}
</style>