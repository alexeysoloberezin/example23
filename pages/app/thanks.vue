<script setup lang="ts">
const {locale} = useI18n()
const route = useRoute()
const email = route.query.email

onMounted(() => {
  setTimeout(() => {
    navigateTo(`/${locale.value || 'en'}/app/login?email=${email}`)
  }, 5000)
})
</script>

<template>
  <div class="relative thanks">
    <img src="/mai_2n.jpg" class="thanks-image" alt="">

    <div class="thanks-form">
      <div>🎉🎉🎉</div>
      <h3>{{ $t('thx.title') }}</h3>
      <div>
        <p>{{ $t('thx.txt') }}</p>
      </div>
      <NuxtLink :to="`/${locale || 'en'}/app/login?email=${email}`" class="btn">{{ $t('form.auth') }}</NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.thanks {
  min-height: calc(100dvh - 60px);
  width: 100%;
  padding-top: 50px;
}

h3 {
  color: #4CAF50;
}

.thanks-image {
  position: absolute;
  top: 0;
  object-fit: cover;
  left: 0;
  width: 100%;
  opacity: 0.3;
  filter: blur(3px);
  height: 100%;
}

.thanks-form {
  text-align: center;
  padding: 40px;
  position: relative;
  margin: 0 auto;
  z-index: 10;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 4px 20px rgba(#6187F2FF, .35);
  background: rgba(5, 5, 39, 0.95);
  backdrop-filter: blur(3px);
  border-radius: 10px;
}
</style>