import { auth, provider } from '@/main'
import router from '@/router'

const types = {
  DISPLAY_NAME: 'user/DISPLAY_NAME',
  EMAIL: 'user/EMAIL',
  EMAIL_VERIFIED: 'user/EMAIL_VERIFIED',
  PHOTO_URL: 'user/PHOTO_URL',
  UID: 'user/UID',
  INVITATIONS: 'user/INVITATIONS',
}

const initialState = {
  // Auth attributes
  displayName: undefined,
  email: undefined,
  emailVerified: undefined,
  photoURL: undefined,
  uid: undefined,
  // Firestore attributes
  inviations: undefined,
}

const getters = {
  isUserLoggedIn: state => (!!state.uid)
}

const actions = {
  signup: async ({ commit }, { email, password }) => {
    if (!email || !password) { return }
    try {
      const response = await auth.createUserWithEmailAndPassword(email, password)
      commit(types.DISPLAY_NAME, { displayName: response.displayName })
      commit(types.EMAIL, { email: response.email })
      commit(types.EMAIL_VERIFIED, { emailVerified: response.emailVerified })
      commit(types.PHOTO_URL, { photoURL: response.photoURL })
      commit(types.UID, { uid: response.uid })
      router.push({ name: 'dashboard' })
    } catch (error) {
      throw Error(error)
    }
  },

  login: async ({ commit }, { email, password }) => {
    if (!email || !password) { return }
    try {
      const response = await auth.signInWithEmailAndPassword(email, password)
      commit(types.DISPLAY_NAME, { displayName: response.displayName })
      commit(types.EMAIL, { email: response.email })
      commit(types.EMAIL_VERIFIED, { emailVerified: response.emailVerified })
      commit(types.PHOTO_URL, { photoURL: response.photoURL })
      commit(types.UID, { uid: response.uid })
      router.push({ name: 'dashboard' })
    } catch (error) {
      throw Error(error)
    }
  },

  logout: async ({ commit }) => {
    auth.signOut()
      .then(() => {
        commit(types.UID, { uid: '' })
        router.push({ name: 'login' })
      })
  },

  authGoogle: async ({ commit }) => {
    try {
      const result = await auth.signInWithPopup(provider.google)
      commit(types.DISPLAY_NAME, { displayName: result.user.displayName })
      commit(types.EMAIL, { email: result.user.email })
      commit(types.EMAIL_VERIFIED, { emailVerified: result.user.emailVerified })
      commit(types.PHOTO_URL, { photoURL: result.user.photoURL })
      commit(types.UID, { uid: result.user.uid })
      router.push({ name: 'dashboard' })
    } catch (error) {
      throw Error(error)
    }
  },

  delete: ({ commit }, user) => {
    const message = 'Type DELETE to permanently delete the account'
    const result = window.prompt(message) // eslint-disable-line
    if (result === 'DELETE') {
      user.delete()
        .then(() => {
          commit(types.UID, { uid: '' })
          router.push({ name: 'signup' })
        })
        .catch((error) => { throw Error(error) })
    }
  },

  passwordReset: (email) => {
    auth.sendPasswordResetEmail(email)
      .catch((error) => { throw Error(error) })
  },

  updatePhoto: ({ commit }, { url }) => {
    auth.currentUser.updateProfile({
      photoURL: url
    })
      .then(() => {
        commit(types.PHOTO_URL, { photoURL: url })
      }).catch((error) => {
        throw Error(error)
      })
  }
}

const mutations = {
  [types.DISPLAY_NAME]: (state, payload) => { state.displayName = payload.displayName },
  [types.EMAIL]: (state, payload) => { state.email = payload.email },
  [types.EMAIL_VERIFIED]: (state, payload) => { state.emailVerified = payload.emailVerified },
  [types.PHOTO_URL]: (state, payload) => { state.photoURL = payload.photoURL },
  [types.UID]: (state, payload) => { state.uid = payload.uid },
}

export default {
  state: initialState,
  getters,
  actions,
  mutations
}
