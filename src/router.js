import Vue from 'vue'
import Router from 'vue-router'
import Account from './views/Account'
import Dashboard from './views/Dashboard'
import PasswordReset from './views/PasswordReset'
import Login from './views/Login'
import Signup from './views/Signup'
import Trip from './views/Trip/index'
import NotFound from './views/NotFound'
import { auth } from './main'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/trips/:id',
      name: 'trip',
      component: Trip,
      meta: { requiresAuth: true }
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/password-reset',
      name: 'password reset',
      component: PasswordReset
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ],

})

router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged((user) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!user) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      next()
    }
  })
})

export default router
