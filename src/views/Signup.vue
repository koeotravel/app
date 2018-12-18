<template>
  <div class="ph3 mv3">
    <h1 class="serif normal f1 ma0 mb4">Create an account</h1>

    <form class="measure-narrow" @submit.prevent="handleSignup(email, password)">
      <v-fieldset>
        <div class="form-group">
          <v-input-email v-model="email" />
        </div>

        <div class="form-group">
          <v-input-password v-model="password" />
        </div>
      </v-fieldset>

      <button type="submit" class="btn mr3">Sign up</button>

      <p class="f6 ma0 mt3">
        Have an account?
        <router-link :to="{name: 'login'}" class="link">
          Log in &rarr;
        </router-link>
      </p>
    </form>
  </div>
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
    handleSignup(email, password) {
      this.$store.dispatch('signup', { email, password })
    },
  },
}
</script>
