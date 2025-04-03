<script setup lang="ts">
import { useSupabase} from "~/utils/supabase";
import AppWrapper from "~/src/layouts/AppWrapper.vue";
import {useUserStore} from "~/store/userStora";

const userStore = useUserStore()

const {initUser} = userStore

onMounted(() => {
  initUser(false, false)
})
</script>

<template>
  <AppWrapper>
    <keep-alive>
      <slot></slot>
    </keep-alive>
  </AppWrapper>
</template>

<style scoped lang="scss">

</style>