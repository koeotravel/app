<template>
  <main>
    <v-app-bar></v-app-bar>
    <router-view/>
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

<style src="./assets/main.scss" lang="scss"></style>
