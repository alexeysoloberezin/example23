import Aura from '@primevue/themes/aura';
import {definePreset} from "@primevue/themes";

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  // nitro: {
  //   prerender: {
  //     routes: ['/'] // Автоматически рендерит `/index.html`
  //   }
  // },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@primevue/nuxt-module',
    '@nuxtjs/i18n',
    '@nuxtjs/supabase',
    '@vee-validate/nuxt',
    '@pinia/nuxt',
  ],
  googleFonts: {
    families: {
      Montserrat: [300, 400, 500, 700],
      'Russo One': true,
    },
    display: 'swap',
  },
  image: {
    format: ['webp', 'avif'], // Авто-конвертация в быстрые форматы
    quality: 80, // Оптимальный баланс качества
    screens: { sm: 480, md: 768, lg: 1024, xl: 1440, xxl: 1920 }
  },
  i18n: {
    strategy: 'prefix',
    defaultLocale: 'ru',
    locales: [
      { code: 'ru', iso: 'ru-RU', name: 'Русский' },
      { code: 'en', iso: 'en-US', name: 'English' }
    ],
    vueI18n: './i18n.config.ts'
  },

  css: ['~/src/styles/main.scss'],

  primevue: {
    options: {
      theme: {
        preset: definePreset(Aura, {
          semantic: {
            primary: {
              50: '{indigo.50}',
              100: '{indigo.100}',
              200: '{indigo.200}',
              300: '{indigo.300}',
              400: '{indigo.400}',
              500: '{indigo.500}',
              600: '{indigo.600}',
              700: '{indigo.700}',
              800: '{indigo.800}',
              900: '{indigo.900}',
              950: '{indigo.950}'
            }
          }
        })
      }
    },
    components: {
      include: ['Button','Toast', 'DataTable']
    },

  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      secretKey: process.env.NUXT_PUBLIC_SUPABASE_KEY,
      paymentKey: process.env.NUXT_PUBLIC_API_PAYMENT_KEY
    },
  },
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/en/app/login',
      callback: '/en/app/courses/view/1/1',
      include: ['/app/courses'],
      exclude: ['/app/login', '/app/register', '/app/buy', '/app/buy/10', '/app/buy/15'],
      cookieRedirect: false,
    }
  },

  compatibilityDate: '2025-01-30',
})