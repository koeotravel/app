<template>
  <button @click="authGoogle">
    <span>Continue with Google</span>
  </button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['authGoogle']),
  },
}
</script>
