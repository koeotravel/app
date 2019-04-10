import * as types from '@/store/mutation-types'
import { auth } from '@/main'
import router from '@/router'

const initialState = {
  currentUser: {},
  loginErrors: [],
}

const getters = {
  isUserLoggedIn: state => (!!state.currentUser.uid),
}

const actions = {
  signup: async({ commit }, { email, password }) => {
    try {
      const response = await auth.createUserWithEmailAndPassword(email, password)
      commit(types.SET_USER, response.user)
      commit(types.UNSET_ERRORS)
      router.push({ name: 'feed' })
    } catch(error) {
      commit(types.SET_ERRORS, [error])
    }
  },

  login: async ({ commit }, { email, password }) => {
    try {
      const response = await auth.signInWithEmailAndPassword(email, password)
      commit(types.SET_USER, response.user)
      commit(types.UNSET_ERRORS)
      router.push({ name: 'feed' })
    } catch (error) {
      commit(types.SET_ERRORS, [error])
    }
  },

  logout: async ({ commit }) => {
    auth.signOut()
      .then(() => {
        commit(types.UNSET_USER)
        router.push({ name: 'login' })
      })
  },

  async updatePassword({ commit }, { password, passwordConfirm }) {
    if ( password && passwordConfirm && password === passwordConfirm ) {
      auth.currentUser.updatePassword(password)
        .then(() => {
          commit(types.UNSET_ERRORS)
        })
        .catch((error) => {
          commit(types.SET_ERRORS, [error])
        })
    } else {
      commit(types.SET_ERRORS, [{
        message: 'Passwords must match'
      }])
    }
  }
}

const mutations = {
  [types.SET_USER] (state, payload) {
    return state.currentUser = payload
  },

  [types.UNSET_USER] (state) {
    return state.currentUser = {}
  },

  [types.SET_ERRORS] (state, payload) {
    return state.errors = payload
  },

  [types.UNSET_ERRORS] (state) {
    return state.errors = []
  },
}

export default {
  state: initialState,
  getters,
  actions,
  mutations,
}
