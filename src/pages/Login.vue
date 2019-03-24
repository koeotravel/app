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
            :dirty="hasErrors"
          />
        </div>

        <div class="form-group">
          <BaseInputPassword
            v-model="password"
            :dirty="hasErrors"
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

      <p v-if="hasErrors" class="f6 ma0 mt3 pa3 bg-washed-red dark-red">
        {{ user.errors }}
      </p>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      email: undefined,
      password: undefined,
    };
  },

  computed: {
    ...mapState(['user']),
    ...mapGetters(['hasErrors']),
  },

  methods: {
    handleLogin(email, password) {
      this.$store.dispatch('login', { email, password });
    },
  },
};
</script>
