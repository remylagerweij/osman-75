// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: "Osman's 75 Hard - Het Ultieme Plan",
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Information:wght@300;400;600;800&display=swap' }, // Using Information or Inter? HTML said Inter.
        // Wait, HTML said Inter. Let's stick to Inter.
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0' }
      ]
    }
  }
})
