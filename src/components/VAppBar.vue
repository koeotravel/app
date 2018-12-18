<template>
  <div class="ph3 mv3 flex appbar">
    <div class="flex-auto">
      <router-link :to="{name: 'dashboard'}" class="w2 dib">
        <svg class="mw-100" width="100%" viewBox="0 0 160 128" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch -->
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="logo-v3" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="2" transform="translate(-48.000000, -64.000000)" fill-rule="nonzero">
        <g id="logo" transform="translate(48.000000, 64.000000)">
        <path d="M11.9998042,25.9569572 C11.9990179,25.9361825 11.9978823,25.9153709 11.9963921,25.8945289 C11.9978054,25.9157267 11.9992422,25.9369179 12.0007025,25.9581024 Z M12.2163884,28 C14.1611904,41.6243031 25.889168,52 39.9334618,52 L100,52 L100,28 C47.6444047,28 45.6918726,28 12.2163884,28 Z" id="Combined-Shape-Copy-4" stroke="#2B2C5A" stroke-width="8" fill="#F4C429"></path>
        <path d="M4.21638836,4.00031769 C6.16119038,17.6246208 17.889168,28.0003177 31.9334618,28.0003177 L92,28.0003177 L92,4.00031769 C39.6444047,4.00031769 37.6918726,4.00031769 4.21638836,4.00031769 Z" id="Combined-Shape-Copy-5" stroke="#2B2C5A" stroke-width="8" fill="#F4C429"></path>
        <path d="M155.876924,60.123236 C153.877332,28.7282753 127.766815,4 96,4 C62.862915,4 36,30.862915 36,64 C36,95.7790236 60.7473061,121.897457 92.1595406,123.879225 C94.8416994,89.4095132 121.842056,62.1665419 155.876924,60.123236 Z" id="head" stroke="#2B2C5A" stroke-width="8" fill="#FFFFFF"></path>
        <path d="M158.000342,64.0306453 C139.68774,64.0306453 123.31668,72.8450944 112,85.6668097 L112,2.01627976 C138.985389,8.96183881 159.201618,33.0548001 159.969453,62.0035602 C160.008423,63.4727783 158.661179,64.0306453 158.000342,64.0306453 Z" id="beak" fill="#2B2C5A"></path>
        <circle id="eye" fill="#2B2C5A" cx="86" cy="42" r="10"></circle>
        </g>
        </g>
        </g>
        </svg>
      </router-link>
    </div>

    <div v-if="userIsLoggedIn" class="flex-auto tr">
      <v-avatar src="http://placekitten.com/100"></v-avatar>
      <nav>
        <ul>
          <li><router-link :to="{name: 'profile'}">Profile</router-link></li>
          <li><button type="button" @click="logout" class="btn">Log out</button></li>
        </ul>
      </nav>
    </div>

    <!-- Create trip modal -->
    <!-- <addtrip v-show="this.showTripModal"></addtrip> -->

  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import {
  VAvatar,
  VButton,
  VHr,
} from '.'

export default {
  components: {
    VButton,
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
    ...mapGetters(['userIsLoggedIn']),
  },

  methods: {
    ...mapActions(['logout', 'getAvatar']),
  },
}
</script>
