<template>
  <div>
    <form @submit.prevent="handleLogin(email, password)" class="mw16 gutters">
      <h1>Log in</h1>
      <v-fieldset>
        <div class="form-group">
          <v-input-email v-model="email" />
        </div>

        <div class="form-group">
          <v-input-password v-model="password" class="mb2" />
          <router-link :to="{name: 'password reset'}" class="fs3">
            Forgot password?
          </router-link>
        </div>
      </v-fieldset>

      <button type="submit" class="btn mr4">Log in</button>
      <router-link :to="{name: 'signup'}">
        <button type="submit" class="btn btn-2">Sign up &rarr;</button>
      </router-link>
    </form>
  </div>
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
    handleLogin(email, password) {
      this.$store.dispatch('login', { email, password })
    },
  },
}
</script>
