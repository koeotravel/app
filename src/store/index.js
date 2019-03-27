import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import account from './modules/account';

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
})

export default new Vuex.Store({
  state: {},

  mutations: {},

  modules: {
    account,
  },

  plugins: [
    vuexLocalStorage.plugin,
  ],
})
