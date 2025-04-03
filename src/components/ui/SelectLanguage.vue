<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import {useWindowSize} from "@vueuse/core";

const { locale, setLocale } = useI18n();

const menu = ref();
const items = ref([
  {
    label: 'English',
    key: 'en',
    icon: '/gb.svg', // Флаг Великобритании
  },
  {
    label: 'Русский',
    key: 'ru',
    icon: '/ru.svg', // Флаг Великобритании
  },
]);

const languageNames = {
  en: "English",
  ru: "Русский"
};

const currentLanguage = computed(() => languageNames[locale.value]);

const toggle = (event: Event) => {
  menu.value.toggle(event);
};

const setLocal = (locale: string) => {
  localStorage.setItem("language", locale);
  setLocale(locale);
};

const {width} = useWindowSize()
</script>

<template>
  <div>
    <Button @click="toggle" size="small" aria-haspopup="true" aria-controls="overlay_tmenu">
        <img src="/planet-earth.png" style="width: 20px;height: 20px" alt="Language" />
      {{ locale === 'ru' ? 'Язык' : 'Language' }}
    </Button>
    <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup>
      <template #item="{ item, props }: { item: any, props: any }">
        <a
            v-ripple
            class="flex items-center p-2 cursor-pointer"
            @click="setLocal(item?.key)"
        >
          <span class="mr-2 shrink-0">
            <img :src="item.icon" style="width: 18px" alt="">
          </span>
          <span>{{ item.label }}</span>
          <Badge
              v-if="item.badge"
              class="ml-auto"
              :value="item.badge"
          />
          <span
              v-if="item.shortcut"
              class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
          >{{ item.shortcut }}</span
          >
        </a>
      </template>
    </TieredMenu>
  </div>
</template>

<style scoped lang="scss"></style>
