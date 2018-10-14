<template>
  <div>
    <form @submit.prevent="handlePasswordReset(email)" class="mw16 gutters">
      <h1>Find your account</h1>
      <v-fieldset>
        <div class="form-group">
          <v-input-email v-model="email" />
          <p class="fs3">
            We’ll send you a link to change your password.
          </p>
        </div>
      </v-fieldset>

      <button type="submit" class="btn mr4">Request password reset</button>
    </form>
  </div>
</template>

<script>
import VFieldset from '@/components/VFieldset'
import VInputEmail from '@/components/VInputEmail'

export default {
  components: {
    VFieldset,
    VInputEmail
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
