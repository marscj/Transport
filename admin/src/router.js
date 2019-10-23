import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [{
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [{
          path: '/',
          name: 'home',
          component: () => import('./views/Home.vue')
        },
        {
          path: '/page2',
          name: 'page-2',
          component: () => import('./views/Page2.vue')
        },
      ],
    },

    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [{
          path: '/login',
          name: 'login',
          component: () => import('@/views/login/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/views/register/Register.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: () => import('@/views/register/ForgotPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/reset-password',
          name: 'reset-password',
          component: () => import('@/views/register/ResetPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/error-404',
          name: 'page-error-404',
          component: () => import('@/views/Error404.vue')
        },
      ]
    },
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = "none";
  }
})

export default router
