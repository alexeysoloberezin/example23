<script setup lang="ts">
import SelectLanguage from "~/src/components/ui/SelectLanguage.vue";
import {useWindowSize} from "@vueuse/core";

const { width, height } = useWindowSize()
const {locale} = useI18n()
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-row">
        <div class="logo-text" style="white-space: nowrap">Neuro Aura</div>
        <nav class="lg:block hidden">
          <ul class="header-nav">
            <li><NuxtLink to="#examples" class="header-nav-item" >{{ $t('nav.link_1') }}</NuxtLink></li>
            <li><NuxtLink to="#for" class="header-nav-item" >{{ $t('nav.link_2') }}</NuxtLink></li>
            <li><NuxtLink to="#programm" class="header-nav-item" >{{ $t('nav.link_3') }}</NuxtLink></li>
            <li><NuxtLink to="#stud" class="header-nav-item" >{{ $t('nav.link_4') }}</NuxtLink></li>
          </ul>
        </nav>
        <div>

        </div>
        <div class="header-btns flex items-center gap-1">
          <NuxtLink :to="`/${locale || 'en'}/app/courses`">
            <Button size="small">{{ $t('nav.lk') }}</Button>
          </NuxtLink>
          <SelectLanguage />
        </div>
      </div>
    </div>
    <!--     <img class="header-logo" src="https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg" alt="">-->
  </header>
</template>

<style lang="scss" scoped>

.header {
  position: absolute;
  top: 0px;
  width: 100dvw;
  left: 0;
  z-index: 999;
  padding: 15px 0;

  &-row{
    display: flex;
    align-items: center;
  }

  &-btns{
    margin-left: auto;
  }

  &-logo {
    max-width: 120px;
    font-size: 32px;
    font-weight: 700;
  }

  &-nav {
    margin-left: 50px;
    display: flex;
    align-items: center;
    gap: 35px;
    &-item {
      color: #fff;
    }
  }
}
</style>