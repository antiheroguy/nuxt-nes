// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  spaLoadingTemplate: false,
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  css: [
    'primevue/resources/themes/lara-dark-teal/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
    '@/assets/styles.scss'
  ],
  build: {
    transpile: ['prime']
  },
  app: {
    head: {
      title: 'NES Game'
    }
  },
  runtimeConfig: {
    public: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    }
  }
})
