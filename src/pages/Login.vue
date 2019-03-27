<template>
  <div class="ph3 mv3">
    <h1 class="serif normal f1 ma0 mb4">
      Log in
    </h1>

    <form
      class="measure-narrow"
      @submit.prevent="handleLogin(email, password)"
    >
      <BaseFieldset>
        <div class="form-group">
          <BaseInputEmail
            v-model="email"
          />
        </div>

        <div class="form-group">
          <BaseInputPassword
            v-model="password"
          />
        </div>
      </BaseFieldset>

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

      <p v-if="account.errors && account.errors.length > 0" class="f6 ma0 mt3 pa3 bg-washed-red dark-red">
        {{ account.errors }}
      </p>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      email: undefined,
      password: undefined,
    };
  },

  computed: {
    ...mapState(['account']),
  },

  methods: {
    handleLogin(email, password) {
      this.$store.dispatch('login', { email, password });
    },
  },
};
</script>
