import { auth } from '@/main'
import router from '@/router'

const types = {
  USER: 'user/USER',
}

const initialState = {
  data: undefined,
}

const getters = {
  isUserLoggedIn: state => (!!state.data)
}

const actions = {
  signup: async ({ commit }, { email, password }) => {
    if (!email || !password) { return }
    try {
      const response = await auth.createUserWithEmailAndPassword(email, password)
      commit(types.USER, response.user)
      router.push({ name: 'dashboard' })
    } catch (error) {
      throw Error(error)
    }
  },

  login: async ({ commit }, { email, password }) => {
    if (!email || !password) { return }
    try {
      const response = await auth.signInWithEmailAndPassword(email, password)
      commit(types.USER, response.user)
      router.push({ name: 'dashboard' })
    } catch (error) {
      throw Error(error)
    }
  },

  logout: async ({ commit }) => {
    auth.signOut()
      .then(() => {
        commit(types.USER, initialState.data)
        router.push({ name: 'dashboard' })
      })
  },

  delete: ({ commit }, user) => {
    const message = 'Type DELETE to permanently delete the account'
    const result = window.prompt(message) // eslint-disable-line
    if (result === 'DELETE') {
      user.delete()
        .then(() => {
          commit(types.USER, initialState.data)
          router.push({ name: 'dashboard' })
        })
        .catch((error) => { throw Error(error) })
    }
  },

  passwordReset: (email) => {
    auth.sendPasswordResetEmail(email)
      .catch((error) => { throw Error(error) })
  },
}

const mutations = {
  [types.USER]: (state, payload) => { state.data = payload }
}

export default {
  state: initialState,
  getters,
  actions,
  mutations
}
