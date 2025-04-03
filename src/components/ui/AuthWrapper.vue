<script setup lang="ts">
const {image} = defineProps(['image'])
</script>

<template>
  <div class="authWrapper">
    <div class="authWrapper-left">
      <slot></slot>
    </div>
    <div class="authWrapper-right relative">
      <div class="darkenOverlay"></div>
      <img :src="image" alt="">
    </div>
  </div>
</template>

<style scoped lang="scss">
.authWrapper{
  display: grid;
  height: 100%;
  min-height: 100dvh;
  @media (min-width: 700px) {
    grid-template-columns: 650px 1fr;

  }
  &-left{
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    height: 100%;
    min-height: 100dvh;
  }
  &-right{
    width: 100%;
    height: 100%;
    border-left: 1px solid rgba(255,255,255, 0.27);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>