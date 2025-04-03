<script setup lang="ts">
const {title} = defineProps(['title'])

</script>

<template>
  <div class="card">
    <div class="card-title font2" v-html="title"></div>
    <div class="card-text"><slot></slot></div>
  </div>
</template>

<style scoped lang="scss">
.card{
  padding: 60px 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(236, 13, 250, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  @media (max-width: 1600px) {
    padding: 45px 30px;
  }
  @media (max-width: 1100px) {
    padding: 25px 15px;
  }
  &-title{
    font-size: clamp(19px, 3vw, 28px);
    margin-bottom: 10px;
    line-height: 1.1;
  }
  &-text{
    line-height: 1.3;
  }
}
</style>