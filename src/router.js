import Vue from 'vue';
import Router from 'vue-router';

// Pages
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import PasswordReset from './pages/PasswordReset';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Trip from './pages/Trip';
import NotFound from './pages/NotFound';
import { auth } from './main';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'feed',
      component: Feed,
      meta: { requiresAuth: true },
    },
    {
      path: '/trips/:id',
      name: 'trip',
      component: Trip,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true },
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
      component: PasswordReset,
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged((user) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!user) {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router;
