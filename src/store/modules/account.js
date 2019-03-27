import { auth } from '@/main'
import router from '@/router'
import { accountTypes } from '../types'

const initialState = {
  currentUser: {},
  loginErrors: [],
}

const getters = {
  isUserLoggedIn: state => (!!state.currentUser.uid),
}

const actions = {
  login: async ({ commit }, { email, password }) => {
    try {
      const response = await auth.signInWithEmailAndPassword(email, password)
      commit(accountTypes.SET_USER, response.user)
      commit(accountTypes.UNSET_ERRORS)
      router.push({ name: 'feed' })
    } catch (error) {
      commit(accountTypes.SET_ERRORS, [error])
    }
  },

  logout: async ({ commit }) => {
    auth.signOut()
      .then(() => {
        commit(accountTypes.UNSET_USER)
        router.push({ name: 'login' })
      })
  },
}

const mutations = {
  [accountTypes.SET_USER] (state, payload) {
    return state.currentUser = payload
  },

  [accountTypes.UNSET_USER] (state) {
    return state.currentUser = {}
  },

  [accountTypes.SET_ERRORS] (state, payload) {
    return state.errors = payload
  },

  [accountTypes.UNSET_ERRORS] (state) {
    return state.errors = []
  },
}

export default {
  state: initialState,
  getters,
  actions,
  mutations,
}
