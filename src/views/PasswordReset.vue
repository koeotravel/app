<template>
  <div class="ph3 mv3">
    <h1 class="serif normal f1 ma0 mb2">
      Reset password
    </h1>

    <form
      class="measure-narrow"
      @submit.prevent.once="handlePasswordReset(email)"
    >
      <p class="ma0 pb4 serif">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <VFieldset>
        <div class="form-group">
          <VInputEmail v-model="email" />
        </div>
      </VFieldset>

      <button
        type="submit"
        class="btn"
      >
        Send reset link
      </button>
    </form>
  </div>
</template>

<script>
import { auth } from '@/main';
import VFieldset from '@/components/VFieldset';
import VInputEmail from '@/components/VInputEmail';

export default {
  components: {
    VFieldset,
    VInputEmail,
  },

  data() {
    return {
      email: '',
    };
  },

  methods: {
    handlePasswordReset(email) {
      auth.sendPasswordResetEmail(email)
        .catch((error) => { throw Error(error); });
    },
  },
};
</script>
