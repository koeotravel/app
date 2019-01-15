<template>
  <div class="ph3 mv3">
    <h1 class="serif normal f1 ma0 mb4">
      Create an account
    </h1>

    <form
      class="measure-narrow"
      @submit.prevent="handleSignup(email, password)"
    >
      <BaseFieldset>
        <div class="form-group">
          <BaseInputEmail v-model="email" />
        </div>

        <div class="form-group">
          <BaseInputPassword v-model="password" />
        </div>
      </BaseFieldset>

      <button
        type="submit"
        class="btn mr3"
      >
        Sign up
      </button>

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
export default {
  data() {
    return {
      email: undefined,
      password: undefined,
    };
  },

  methods: {
    handleSignup(email, password) {
      this.$store.dispatch('signup', { email, password });
      this.email = '';
      this.password = '';
    },
  },
};
</script>
