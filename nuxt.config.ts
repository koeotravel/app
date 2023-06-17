// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxthq/ui', '@nuxtjs/supabase', '@nuxtjs/web-vitals'],
  css: ['@/assets/app.css'],
});
