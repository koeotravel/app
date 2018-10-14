<template>
  <main>
    <v-app-bar></v-app-bar>
    <router-view></router-view>
    <ModalContainer v-show="$store.state.showModal"/>
  </main>
</template>

<script>
import VAppBar from './components/VAppBar'
import ModalContainer from './components/ModalContainer'

export default {
  components: {
    VAppBar,
    ModalContainer
  }
}
</script>

<style src="./assets/styles/main.scss" lang="scss"></style>
