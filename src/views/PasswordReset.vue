<template>
  <div class="vh-100 dt w-100">
    <div class="dtc v-mid">
      <form class="measure-narrow center" @submit.prevent="handlePasswordReset(email)">

        <v-fieldset class="ba b--transparent ph0 mh0">
          <legend class="f4 fw6 ph0 mh0">Forgot Password</legend>

          <div div class="mv3">
            <label class="db fw6 lh-copy f6" for="email">Email</label>
            <input class="b pa2 input-reset ba br1 w-100" type="email" id="email" v-model="email" required />
          </div>

        </v-fieldset>

        <button class="b ph3 pv2 input-reset ba b--black br1 bg-transparent pointer f6 dib" type="submit">
          Send Request
        </button>

        <div class="lh-copy mt3">
          <router-link class="f6 link black db" to="/login">Remembered your password? Log In.</router-link>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import VFieldset from '@/components/VFieldset'

export default {
  components: {
    VFieldset,
  },

  data() {
    return {
      email: '',
    }
  },

  methods: {
    handlePasswordReset(email) {
      this.$store.dispatch('passwordReset', email)
    },
  },
}
</script>
