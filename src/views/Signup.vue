<template>
  <form @submit.prevent="handleSignup(email, password)">
    <v-fieldset>
      <v-input-email v-model="email"/>
      <v-input-password v-model="password"/>
    </v-fieldset>
    <button type="submit">Sign up</button>
  </form>
</template>

<script>
import {
  VAuthButtonGoogle,
  VFieldset,
  VHr,
  VInputEmail,
  VInputPassword,
} from '@/components'

export default {
  components: {
    VAuthButtonGoogle,
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
    handleSignup(email, password) {
      this.$store.dispatch('signup', { email, password })
    },
  },
}
</script>
