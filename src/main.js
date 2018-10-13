import 'firebase/firestore'
import firebase from 'firebase'
import moment from 'moment'
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
}

export const db = firebase.initializeApp(config).firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()

// Turn on Error Tracking for production environments only!
if (process.env.NODE_ENV === 'production') {
  Raven
    .config(process.env.VUE_APP_SENTRY)
    .addPlugin(RavenVue, Vue)
    .install();
}

// eslint-disable-next-line
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
})

Vue.filter('humanDate', (date, format = 'L') => (moment(date).isValid()
  ? moment(date).format(format)
  : null
))

Vue.filter('humanTime', (time, format = 'h:mm A') => (moment(time).isValid()
  ? moment(time, 'HH:mm').format(format)
  : '-'
))

Vue.filter('humanUnixTime', (time, format = 'h:mm A') => (moment(time).isValid()
  ? moment(moment.unix(time)).utc().format(format)
  : null
))
