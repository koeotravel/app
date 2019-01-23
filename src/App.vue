<template>
  <div class="site">
    <AppHeader />
    <main class="site-content">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'

export default {
  components: {
    AppHeader,
    AppFooter,
  },
}
</script>

<style src="./assets/styles/main.scss" lang="scss"></style>
