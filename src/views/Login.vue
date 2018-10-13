<template>
  <form @submit.prevent="handleLogin(email, password)">
    <v-fieldset>
      <v-input-email v-model="email" />
      <v-input-password v-model="password" />
    </v-fieldset>
    <button type="submit">Log in</button>
  </form>
</template>

<script>
import {
  VFieldset,
  VHr,
  VInputEmail,
  VInputPassword,
} from '@/components'

export default {
  components: {
    VFieldset,
    VHr,
    VInputEmail,
    VInputPassword,
  },

  data() {
    return {
      email: undefined,
      password: undefined,
    }
  },

  methods: {
    handleLogin(email, password) {
      this.$store.dispatch('login', { email, password })
    },
  },
}
</script>
