<script setup lang="ts">
const props = defineProps(['image', 'isActive', 'text', 'text2', 'tooltip'])
const model = defineModel()
</script>

<template>
  <div class="radio" v-tooltip="tooltip" :class="{'isActive': isActive}">
    <div class="info" v-if="tooltip">
      <img src="/tooltip.png" alt="">
    </div>
    <div v-if="text" class="radio-text">{{ text }}</div>
    <div v-if="text2" class="radio-text">{{ text2 }}</div>
    <template v-if="typeof image === 'string'">
      <img v-if="image" :src="image" alt="">
    </template>
    <template v-if="typeof image === 'object'">
      <div class="images">
        <img v-for="i in image" :src="i" alt="">
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.radio{
  border-radius: 12px;
  border: 5px solid transparent;
  background: #fff;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 100px;
  align-items: center;
  text-align: center;
  cursor: pointer;
  justify-content: center;
  padding: 10px;
  .images{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
  }
  .info{
    position: absolute;
    top: 2px;
    right: 2px;

    z-index: 1;
    img{
      max-width: 20px;
    }
  }
  &-text{
    color: #000;
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 4px;
    line-height: 1;
    letter-spacing: 0.5px;
    font-family: 'Russo One';
  }

  &.isActive{
    border-color: #32CD32;
    .radio-text{
      color: #32CD32;
    }
  }
}
</style>