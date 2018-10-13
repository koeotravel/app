import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import { chat, dashboard, invitations, foursquare, user, trip, days, events } from './modules'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    showModal: false,
    showModalView: undefined
  },

  mutations: {
    openModal: (state, modalView) => {
      state.showModal = true
      state.showModalView = modalView
    },
    closeModal: (state) => {
      state.showModal = false
      state.showModalView = null
    },
  },

  modules: {
    chat,
    dashboard,
    foursquare,
    invitations,
    user,
    trip,
    days,
    events
  },

  plugins: [
    vuexLocalStorage.plugin,
  ]
})
