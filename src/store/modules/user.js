import { auth } from '@/main'
import router from '@/router'

const types = {
  SET_USER: 'user/SET_USER',
  ADD_ERRORS: 'user/ADD_ERRORS',
  RESET_ERRORS: 'user/RESET_ERRORS',
}

const initialState = {
  data: undefined,
  errors: [],
}

const getters = {
  userIsLoggedIn: state => (!!state.data),
  hasErrors: state => state.errors.length > 0,
}

const actions = {
  // signup: async ({ commit }, { email, password }) => {
  //   if (!email) { return }
  //   try {
  //     // const response = await auth.createUserWithEmailAndPassword(email, password)
  //     // commit(types.SET_USER, response.user)
  //     // router.push({ name: 'feed' })

  //     const actionCodeSettings = {
  //       // URL you want to redirect back to. The domain (www.example.com) for this
  //       // URL must be whitelisted in the Firebase Console.
  //       url: 'http://localhost:8080/confirm',
  //       // This must be true.
  //       handleCodeInApp: true,
  //     }

  //     auth.sendSignInLinkToEmail(email, actionCodeSettings)
  //     window.localStorage.setItem('emailForSignIn', email)
  //   } catch (error) {
  //     throw Error(error)
  //   }
  // },

  login: async ({ commit, state }, { email, password }) => {
    try {
      // try to log user in with email and password
      const response = await auth.signInWithEmailAndPassword(email, password)
      // add the user data to the global state
      commit(types.SET_USER, response.user)
      // clear erros and send user to /feed
      // if the login succeeds
      commit(types.RESET_ERRORS)
      router.push({ name: 'feed' })
    } catch (error) {
      commit(types.ADD_ERRORS, [error])
    }
  },

  logout: async ({ commit }) => {
    auth.signOut()
      .then(() => {
        newFunction(commit);
        router.push({ name: 'login' })
      })
  },

  delete: ({ commit }, user) => {
    const message = 'Type DELETE to permanently delete the account'
    const result = window.prompt(message) // eslint-disable-line
    if (result === 'DELETE') {
      user.delete()
        .then(() => {
          commit(types.SET_USER, initialState.data)
          router.push({ name: 'login' })
        })
        .catch((error) => { throw Error(error) })
    }
  },

  setUser: ({ commit }, payload) => {
    commit(types.SET_USER, payload)
    router.push({ name: 'feed' })
  }
}

const mutations = {
  [types.SET_USER]: (state, payload) => { state.data = payload },
  [types.ADD_ERRORS]: (state, payload) => { state.errors = payload },
  [types.RESET_ERRORS]: (state) => { state.errors = [] },
}

export default {
  state: initialState,
  getters,
  actions,
  mutations,
}
function newFunction(commit) {
  commit(types.SET_USER, initialState.data);
}

