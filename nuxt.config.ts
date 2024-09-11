// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
      ]
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/google-fonts', '@nuxtjs/tailwindcss'],
  googleFonts: {
    families: {
      Spectral: [400, 600],
      Roboto: [400]
    }
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASEURL,
      localURL: process.env.LOCALURL,
    }
  }
})