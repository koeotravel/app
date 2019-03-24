<template>
  <div class="ph3 mv3">
    <h1 class="serif normal f1 ma0 mb4 tc">
      Create an account
    </h1>

    <form
      class="measure-narrow center"
      @submit.prevent="handleSignup(email, password)"
    >
      <BaseFieldset>
        <div class="form-group">
          <BaseInputEmail v-model="email" pill />
        </div>
      </BaseFieldset>

      <BaseButton
        type="submit"
        class="w-100"
      >
        Join
      </BaseButton>

      <p class="f6 ma0 mt3">
        Have an account?
        <RouterLink
          :to="{name: 'login'}"
          class="link"
        >
          Log in &rarr;
        </RouterLink>
      </p>
    </form>
  </div>
</template>

<script>
import { auth } from '@/main'

export default {
  data() {
    return {
      email: undefined,
      password: undefined,
    };
  },

  methods: {
    handleSignup(email) {
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: 'http://localhost:8080/confirm',
        // This must be true.
        handleCodeInApp: true,
      };

      auth.sendSignInLinkToEmail(email, actionCodeSettings)
      window.localStorage.setItem('emailForSignIn', email)
    },
  },
};
</script>
