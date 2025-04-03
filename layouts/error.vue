<script setup >
defineProps({
  error: Object
})

</script>

<template>
  <div class="error-page">
    <h1 v-if="error.statusCode === 404">Страница не найдена 😢</h1>
    <h1 v-else>Ошибка {{ error.statusCode }}</h1>
    <p>{{ error.message }}</p>
    <NuxtLink to="/">Вернуться на главную</NuxtLink>
  </div>
</template>

<style scoped lang="scss">

</style>