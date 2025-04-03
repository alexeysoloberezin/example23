<script setup lang="ts">
const {locale} = useI18n()
</script>

<template>
  <div class="footer">
    <div class="container">
      <div class="footer-wrp">
        <div class="flex footer-wrp-2 gap-2">
          <NuxtLink :to="`/${locale || 'en'}`" class="logo-text mr-3">Neuro Aura</NuxtLink>

        </div>

        <nav>
          <ul class="footer-nav">
            <li>
              <NuxtLink :to="`/${locale || 'en'}/docs/offers`" class="footer-link">{{ $t('landing.footer.offer') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="`/${locale || 'en'}/docs/conf`" class="footer-link">{{ $t('landing.footer.pols') }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <div class="inn">
        ИНН: 163902289299
      </div>

      <a href="https://freekassa.net" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn.freekassa.net/banners/small-dark-1.png" title="Прием платежей на сайте">
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>