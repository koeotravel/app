<template>
  <div>
    <div>
      <router-link :to="{name: 'dashboard'}">
        <img src="/static/images/logo-black.png" alt="Koeo logo" width="60">
      </router-link>
    </div>

    <nav>
      <!-- Unauthenticated -->
      <ul v-if="!isUserLoggedIn">
        <li>
          <router-link :to="{name: 'login'}">
            Log in
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'signup'}">
            Sign up
          </router-link>
        </li>
      </ul>

      <!-- Authenticated -->
      <ul v-else>
        <li>
          <router-link :to="{name: 'account'}">
            <v-avatar :src="user.photoURL"></v-avatar>
          </router-link>
        </li>
        <li>
          <button type="button" @click="logout">Log out</button>
        </li>
      </ul>
    </nav>
    <v-hr/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import {
  VAvatar,
  VHr,
} from '.'

export default {
  components: {
    VAvatar,
    VHr,
  },

  data() {
    return {
      url: '',
    }
  },

  computed: {
    ...mapState(['user']),
    ...mapGetters(['isUserLoggedIn']),
  },

  methods: {
    ...mapActions(['logout', 'getAvatar']),
  },
}
</script>
