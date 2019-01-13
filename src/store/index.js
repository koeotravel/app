import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import user from './modules/user';

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
})

export default new Vuex.Store({
  state: {},

  mutations: {},

  modules: {
    user,
  },

  plugins: [
    vuexLocalStorage.plugin,
  ],
})
