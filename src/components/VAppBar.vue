<template>
  <div class="appbar">
    <div>
      <router-link :to="{name: 'dashboard'}" class="logo">
        <svg viewBox="0 0 696 674" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="koko" transform="translate(-152.000000, -163.000000)" fill="#2B2C5A">
              <g id="bird" transform="translate(104.000000, 163.000000)">
                <g id="feather-and-beak" transform="translate(396.186645, 213.255224) rotate(10.000000) translate(-396.186645, -213.255224) translate(21.186645, 63.255224)">
                  <path d="M450,0.543934877 L450,259.865341 C443.367124,263.702256 436.573708,267.292514 429.632296,270.623573 L385.791152,21.9880895 C265.630673,49.6593276 179.405861,150.714162 166.590522,268.778158 C67.8505503,219.673536 9.9465451e-13,117.760441 1.00186526e-12,-5.25801624e-13 L449.90409,-5.25801624e-13 L450,0.543934877 Z" id="Combined-Shape"></path>
                  <path d="M383.297771,7.44195258 C404.749418,2.57155588 427.0744,-6.29488972e-13 450,-6.25277607e-13 C615.685425,-5.94841689e-13 750,134.314575 750,300 L434.883648,300 L383.297771,7.44195258 Z" id="Combined-Shape"></path>
                </g>
                <path d="M159,374 C159,526.369636 278.571529,650.811844 429,658.612038 L429,89.3879618 C278.571529,97.1881556 159,221.630364 159,374 Z M444,674 C278.314575,674 144,539.685425 144,374 C144,208.314575 278.314575,74 444,74 L444,674 Z M324,284 C307.431458,284 294,270.568542 294,254 C294,237.431458 307.431458,224 324,224 C340.568542,224 354,237.431458 354,254 C354,270.568542 340.568542,284 324,284 Z" id="body-and-eye" fill-rule="nonzero"></path>
              </g>
            </g>
          </g>
        </svg>
      </router-link>
    </div>

    <nav>
      <ul v-if="isUserLoggedIn">
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
