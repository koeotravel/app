<template>
  <form @submit.prevent="handleSignup(email, password)" class="mw16 gutters">
    <h1>Create your account</h1>
    <v-fieldset>
      <div class="form-group">
        <v-input-email v-model="email" />
      </div>
      <div class="form-group">
        <v-input-password v-model="password" />
      </div>
    </v-fieldset>

    <button type="submit" class="btn mr4">Sign up</button>
    <router-link :to="{name: 'login'}">
      <button type="submit" class="btn btn-2">Log in &rarr;</button>
    </router-link>
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
