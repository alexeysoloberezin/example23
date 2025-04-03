<script setup lang="ts">
const {title, text, image, link} = defineProps(['title', 'text', 'image', 'link'])
</script>

<template>
  <div class=" shadowMain">
    <div class="courseCards">
      <div class="courseCards-info">
        <h3 v-html="title"></h3>
        <div class="">
          <div class="courseCards-text" v-html="text"></div>
          <slot></slot>
        </div>
      </div>
      <div class="courseCards-image-box">
        <!--        <img :src="image" class="courseCards-image" alt="">-->
        <video src="/free.MOV" class="courseCards-video" autoplay muted loop playsinline webkit-playsinline></video>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.courseCards-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
}

.courseCards {
  background: rgb(5, 13, 28);
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  z-index: 5;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  min-height: 450px;
  @media (max-width: 600px) {
    padding: 15px;
  }

  &-info {
    position: relative;
    z-index: 2;
    margin-left: 55%;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(12px);
    padding: 25px;
    border-radius: 12px;
    @media (max-width: 1500px) {
      margin-left: 35%;
    }
    @media (max-width: 600px) {
      margin-left: 0%;
    }
  }

  &-text {
    font-size: 19px;
    line-height: 1.2;
    margin: 10px 0 20px;
    @media (max-width: 1000px) {
      font-size: 16px;
    }
    @media (max-width: 800px) {
      font-size: 14px;
    }
  }

  &-imageBox {
    overflow: hidden;
    position: relative;
  }

  &-image {
    position: absolute;
    top: 50%;
    max-width: 50%;
    margin-top: -30px;
    right: 0;
    transform: translate(0%, -50%);

  }
}
</style>