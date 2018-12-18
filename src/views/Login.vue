<template>
  <div class="ph3 mv3">
    <h1 class="serif normal f1 ma0 mb4">
      Log in
    </h1>

    <form
      class="measure-narrow"
      @submit.prevent="handleLogin(email, password)"
    >
      <VFieldset>
        <div class="form-group">
          <VInputEmail v-model="email" />
        </div>

        <div class="form-group">
          <VInputPassword v-model="password" />
        </div>
      </VFieldset>

      <button
        type="submit"
        class="btn mr3"
      >
        Log in
      </button>
      <i class="normal">
        &middot;
      </i>
      <RouterLink
        :to="{name: 'password reset'}"
        class="f6 link"
      >
        Forgot password?
      </RouterLink>

      <p class="f6 ma0 mt3">
        Need an account?
        <RouterLink
          :to="{name: 'signup'}"
          class="link"
        >
          Sign up &rarr;
        </RouterLink>
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
} from '@/components';

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
    };
  },

  methods: {
    handleLogin(email, password) {
      this.$store.dispatch('login', { email, password });
      this.email = '';
      this.password = '';
    },
  },
};
</script>
