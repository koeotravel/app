import { auth } from '@/main';
import router from '@/router';

const types = {
  USER: 'user/USER',
};

const initialState = {
  data: undefined,
};

const getters = {
  userIsLoggedIn: state => (!!state.data),
};

const actions = {
  // signup: async ({ commit }, { email, password }) => {
  //   if (!email) { return; }
  //   try {
  //     // const response = await auth.createUserWithEmailAndPassword(email, password);
  //     // commit(types.USER, response.user);
  //     // router.push({ name: 'feed' });

  //     const actionCodeSettings = {
  //       // URL you want to redirect back to. The domain (www.example.com) for this
  //       // URL must be whitelisted in the Firebase Console.
  //       url: 'http://localhost:8080/confirm',
  //       // This must be true.
  //       handleCodeInApp: true,
  //     };

  //     auth.sendSignInLinkToEmail(email, actionCodeSettings)
  //     window.localStorage.setItem('emailForSignIn', email)
  //   } catch (error) {
  //     throw Error(error);
  //   }
  // },

  login: async ({ commit }, { email, password }) => {
    if (!email || !password) { return; }
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      commit(types.USER, response.user);
      router.push({ name: 'feed' });
    } catch (error) {
      throw Error(error);
    }
  },

  logout: async ({ commit }) => {
    auth.signOut()
      .then(() => {
        commit(types.USER, initialState.data);
        router.push({ name: 'login' });
      });
  },

  delete: ({ commit }, user) => {
    const message = 'Type DELETE to permanently delete the account';
    const result = window.prompt(message) // eslint-disable-line
    if (result === 'DELETE') {
      user.delete()
        .then(() => {
          commit(types.USER, initialState.data);
          router.push({ name: 'login' });
        })
        .catch((error) => { throw Error(error); });
    }
  },

  setUser: ({ commit }, payload) => {
    commit(types.USER, payload)
    router.push({ name: 'feed' });
  }
};

const mutations = {
  [types.USER]: (state, payload) => { state.data = payload; },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
