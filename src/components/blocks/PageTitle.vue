<script setup lang="ts">
const props = defineProps(['title'])

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <div class="mt-4 mb-2 flex align-items-center gap-2">
    <Button  @click="goBack" variant="outlined" icon="pi pi-angle-double-left"></Button>
    <h3>{{ title }}</h3>
  </div>
</template>

<style scoped lang="scss">

</style>