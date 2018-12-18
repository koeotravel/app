<template>
  <div class="site">
    <VAppBar />
    <main class="site-content">
      <RouterView />
    </main>
  </div>
</template>

<script>
import VAppBar from './components/VAppBar';

export default {
  components: {
    VAppBar,
  },
};
</script>

<style src="./assets/styles/main.scss" lang="scss"></style>
