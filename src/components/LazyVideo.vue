<template>
  <div :class="['video-container', cover ? 'video-cover' : '']">
    <!-- Заглушка с кнопкой Play -->
    <div v-if="!isLoaded" :class="['poster-wrapper', cover ? 'video-cover' : '']" @click="loadVideo">
      <img :src="poster" :class="['poster', classNamePoster, cover ? 'video-cover' : '']" alt="Video poster" />
      <button class="play-button">
        ▶️
      </button>
    </div>

    <!-- Видео появляется только после клика -->
    <video
        v-else
        ref="videoPlayer"
        :src="videoSrc"
        :controls="isControlled"
        :class="['lazyVideo', className, cover ? 'video-cover' : '', initialSize ? 'no-aspect' : '']"
    ></video>
  </div>
</template>

<script setup>
import { ref } from "vue";


defineProps({
  videoSrc: { type: String, required: true }, // Путь к видео
  poster: { type: String, required: true }, // Путь к постеру
  cover: {type: Boolean, default: false },
  className: { type: String, required: false, default: "" },
  classNamePoster: { type: String, required: false, default: "" },
  isControlled: { type: Boolean, default: false },
  initialSize: { type: Boolean, default: false }
});

const emit = defineEmits(['update:click'])


const isLoaded = ref(false);
const videoPlayer = ref(null);

const loadVideo = () => {
  isLoaded.value = true;
  emit('update:click', videoPlayer.value)
  setTimeout(() => {
    videoPlayer.value?.play(); // Автостарт видео после загрузки
  }, 100);
};


</script>

<style scoped>
.video-container {
  position: relative;
  width: fit-content;
  border-radius: 12px;
  overflow: hidden;
}
.video-cover{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.poster-wrapper {
  position: relative;
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}

.poster {
  width: 100%;
  border-radius: 12px;
  aspect-ratio: 16/9;
  overflow: hidden;
  display: block;
  object-fit: cover;
}

.play-button {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: white;
  font-size: 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 25px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
}

.play-button:hover {
  background: rgba(0, 0, 0, 0.8);
}

.lazyVideo {
  width: 100%;
  border-radius: 12px;
  aspect-ratio: 16/9;
  overflow: hidden;
  display: block;
}

.no-aspect {
  aspect-ratio: auto; /* Убираем фиксированное соотношение сторон */
  width: auto; /* Автоматический размер */
  height: auto; /* Высота по контенту */
  max-width: 100%; /* Ограничиваем ширину */
}
</style>
