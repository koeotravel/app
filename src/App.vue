<template>
  <div class="site">
    <v-app-bar></v-app-bar>
    <main class="site-content">
      <router-view></router-view>
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
