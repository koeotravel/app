import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import accountModule from './modules/account';

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
})

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},

  modules: {
    account: accountModule,
  },

  plugins: [
    vuexLocalStorage.plugin,
  ],
})
