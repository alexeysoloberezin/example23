<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const countdown = ref(0);
const cycleDuration = 30 * 60 * 1000; // 30 минут в миллисекундах
const props = defineProps(['showButton'])
const setTimerFromVisit = () => {
  const now = Date.now();
  const visitTimeStr = localStorage.getItem("visitTime"); // Получаем строку
  let startTime: number;

  if (visitTimeStr) {
    startTime = parseInt(visitTimeStr, 10); // Преобразуем в число
  } else {
    startTime = now;
    localStorage.setItem("visitTime", JSON.stringify(startTime)); // Сохраняем как строку
  }

  const elapsed = now - startTime;
  countdown.value = Math.max(0, cycleDuration - elapsed);
};

// Форматирование времени в "X мин. Y сек."
const formattedTime = computed(() => {
  const totalSeconds = Math.floor(countdown.value / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes} мин. ${seconds} сек.`;
});

// Обновление таймера каждую секунду
onMounted(() => {
  setTimerFromVisit();
  setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1000;
    } else {
      localStorage.setItem("visitTime", JSON.stringify(Date.now())); // Записываем как строку
      setTimerFromVisit(); // Перезапускаем таймер
    }
  }, 1000);
});

const route = useRoute()
const tariff = route.params.price
const {locale} = useI18n()
</script>

<template>
  <NuxtLink :to="`/${locale || 'en'}/app/buy/15`" class="timer">
    <div class="container">
      <div class="timer-wrp">
        <div v-html="tariff == '10' ? $t('landing.bannerText') : $t('landing.bannerText_15')"></div>
        <div class="timer-box">{{ formattedTime }}</div>
        <Button v-if="showButton" severity="success" size="small" label="Купить курс"></Button>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.timer {
  background: #1f2b47;
  color: #fff;
  display: flex;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  height: 45px;
  &-box {
    background: rgba(0, 0, 0, 0.15);
    padding: 3px 6px;
    border-radius: 7px;
    font-size: 14px;
    @media (max-width: 700px) {
      font-size: 13px;
    }
  }

  @media (max-width: 700px) {
    height: 65px;
    padding: 8px 0;
    font-size: 14px;
  }
  &-wrp {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    @media (max-width: 700px) {
      text-align: center;
      flex-direction: column;
      gap: 0px;
    }
  }
}
</style>
