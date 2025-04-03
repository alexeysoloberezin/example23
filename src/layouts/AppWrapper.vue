<script setup lang="ts">
import { ref, computed } from "vue";
import { useSupabase } from "~/utils/supabase";
import { useUserStore } from "~/store/userStora";
import { useWindowSize } from "@vueuse/core";
import Menubar from "primevue/menubar";
import SelectLanguage from "~/src/components/ui/SelectLanguage.vue";
import Message from 'primevue/message';

const { width } = useWindowSize();
const supabase = useSupabase();
const { t } = useI18n();
const userStore = useUserStore();
const { logout } = userStore;
const { user, isAdmin } = storeToRefs(userStore);
const router = useRouter();
const showDrawer = ref(false)
const {locale} = useI18n()

const items = computed(() => {
  let nav: any[] = [];

  if(!!user.value) {
    nav = [{
      label: t("nav.link_admin_1"),
      path: `/${locale.value || 'en'}/app/courses`,
      icon: "pi pi-star",
    },
      {
        label: t("nav.link_admin_2"),
        path: `/${locale.value || 'en'}/app/homeworks`,
        icon: "pi pi-star",
      }]
  }

  if (isAdmin.value) {
    nav.push({
      label: t("nav.link_admin_3"),
      path: `/${locale.value || 'en'}/app/admin`,
      icon: "pi pi-envelope",
    });
  }

  // 🔹 Добавляем доп. пункты в бургер-меню, если ширина < 992px
  if (width.value < 992) {
    nav.push({ separator: true });

    nav.push({
      label: t('nav.chooseLocale'),
      command: () => openLanguageModal(),
      icon: "pi pi-globe",
    });
    nav.push({
      label: t("nav.logout"),
      command: () => logout(),
      icon: "pi pi-sign-out",
    });
  }

  return nav;
});

const openLanguageModal = () => {
  showDrawer.value = true
};

const {setLocale} = useI18n()
const itemsLocale = ref([
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


const setLocal = (loc: string) => {
  localStorage.setItem("language", loc);
  setLocale(loc);
};
</script>


<template>
  <div class="min-h-screen">
    <Drawer v-model:visible="showDrawer" :header="$t('nav.chooseLocale')" position="top" style="height: auto">
      <div v-for="el in itemsLocale" @click="setLocal(el.key)" :key="el.key" class="p-menubar-item-content mb-2">
        {{ el.label }}
      </div>
    </Drawer>
    <div class="cyberpunk-grid">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <!-- Вертикальные линии -->
        <line x1="10" y1="0" x2="10" y2="100" stroke="#6187F2" stroke-width="0.1" opacity="0.7">
          <animateTransform attributeName="transform" type="translate" from="0 -100" to="0 100" dur="5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.7" to="0.4" dur="0.8s" repeatCount="indefinite"/>
        </line>

        <line x1="30" y1="0" x2="30" y2="100" stroke="#F829DC" stroke-width="0.1" opacity="0.8">
          <animateTransform attributeName="transform" type="translate" from="0 -100" to="0 100" dur="6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.8" to="0.5" dur="1s" repeatCount="indefinite"/>
        </line>

        <!-- Горизонтальные линии -->
        <line x1="0" y1="20" x2="100" y2="20" stroke="#6187F2" stroke-width="0.1" opacity="0.6">
          <animateTransform attributeName="transform" type="translate" from="-100 0" to="100 0" dur="5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.6" to="0.3" dur="0.9s" repeatCount="indefinite"/>
        </line>

        <line x1="0" y1="40" x2="100" y2="40" stroke="#F829DC" stroke-width="0.1" opacity="0.9">
          <animateTransform attributeName="transform" type="translate" from="-100 0" to="100 0" dur="6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.9" to="0.6" dur="1.2s" repeatCount="indefinite"/>
        </line>
      </svg>
    </div>


    <div>
      <Menubar :model="items" >
        <template #start>
          <a href="/" class="logo-text mr-3">Neuro Aura</a>
        </template>
        <template #item="{ item, props, hasSubmenu, root }">
          <NuxtLink v-ripple class="flex items-center px-3 text-white py-2" :to="item.path">
            <span>{{ item.label }}</span>
            <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
            <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
            <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
          </NuxtLink>
        </template>
        <template #end>
          <div class="flex align-items-center gap-2">
<!--            <Button  @click="goBack" size="small" variant="outlined" icon="pi pi-angle-double-left"></Button>-->

            <NuxtLink v-if="user" :to="`/${locale || 'en'}/app/buy/15`">
              <Message severity="warn" size="small">
                {{ user.hasSub ? $t('acc.premium') : $t('acc.free') }}
              </Message>
            </NuxtLink>

            <div v-if="width > 992">
              <SelectLanguage />
            </div>

            <Button v-if="width > 992" :label="user ? t('nav.logout') : t('title.auth')" size="small" variant="text" @click="logout"></Button>
          </div>
        </template>
      </Menubar>
    </div>
    <div class="">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>