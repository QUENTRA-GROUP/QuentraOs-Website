// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  modules: [
    'nuxt-lucide-icons',
    '@nuxt/devtools',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: [
      { code: 'en', name: 'English' },
      { code: 'id', name: 'Indonesia' },
      { code: 'zh', name: '中文' },
      { code: 'ru', name: 'Русский' },
      { code: 'ja', name: '日本語' },
      { code: 'ar', name: 'العربية' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default'
  }
})