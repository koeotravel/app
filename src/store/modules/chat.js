import firebase from 'firebase/app'
import { db } from '@/main'

const initialState = {
  messages: [],
  showChat: false,
}

const getters = {
  messages: state => state.messages,
  showChat: state => state.showChat
}

const actions = {
  send: ({ rootState }, message) => {
    if (message.text !== '') {
      db.collection('chatGroup').doc(message.chatId)
        .collection('messages').add({
          sender: { uid: rootState.user.uid, email: rootState.user.email },
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          body: message.text,
        })
        .then(() => { this.message = '' })
        .catch((error) => {
          throw Error(error)
        })
    }
  },
  fetchMessages: ({ commit }, { chatId }) => {
    db.collection('chatGroup').doc(`${chatId}`)
      .collection('messages').orderBy('timestamp')
      .get()
      .then((response) => {
        commit('setMessages', response.docs.map(e => e.data()))
      })
    db.collection('chatGroup').doc(`${chatId}`)
      .collection('messages').orderBy('timestamp')
      .onSnapshot((response) => {
        commit('setMessages', response.docs.map(e => e.data()))
      })
  }
}

const mutations = {
  toggleChat: (state) => {
    state.showChat = !state.showChat
  },
  setMessages: (state, messages) => {
    state.messages = messages
  }
}

export default {
  state: initialState,
  getters,
  actions,
  mutations
}
