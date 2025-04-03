<script setup lang="ts">
const {inputId} = defineProps(['inputId'])
</script>

<template>
  <label :for="inputId" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block"><slot></slot></label>
</template>

<style scoped lang="scss">

</style>