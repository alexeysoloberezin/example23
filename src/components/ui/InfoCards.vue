<script setup lang="ts">
const benefits = {
  income: { image: "/gold.png" },
  time: { image: "/hourglass.png" },
  skills: { image: "/skill.png" }
};
</script>

<template>
  <div class="total-wrp mt-4">
    <div class="card" v-for="(item, key) in benefits" :key="key">
      <div class="card-body">
        <img :src="item.image" :alt="key">
        <div class="card-header" v-html="$t(`benefits.${key}.title`)"></div>
      </div>
      <p class="status">{{ $t(`benefits.${key}.status`) }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: #3257e1;
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
.card-body{
  display: flex;
  align-items: center;
  gap: 15px;
  img{
    max-width: 57px;
    @media (max-width: 600px) {
      max-width: 40px;
    }
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: clamp(18px, 2.5vw, 23px);
  line-height: 1.2;
  font-weight:  700;
  margin-bottom: 5px;
  min-height: 40px;
  color: #ffffff;
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
  color: #ffffff;
  font-size: 15px;
  line-height: 1.3;
}
</style>