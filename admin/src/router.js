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
          redirect: '/dashboard/analytics'
        },
        {
          path: '/dashboard',
          redirect: '/dashboard/analytics'
        },
        {
          path: '/dashboard/analytics',
          name: 'analytics',
          component: () => import('./views/Home.vue'),
          meta: {
            rule: 'editor',
            breadcrumb: [{
                title: 'Home',
                url: '/'
              },
              {
                title: 'Dashboard',
                url: '/dashboard'
              },
              {
                title: 'Analytics',
                active: true
              },
            ],
            pageTitle: 'Analytics',
          }
        },
        {
          path: '/business',
          redirect: '/business/orders'
        },
        {
          path: '/business/orders',
          name: 'orders',
          component: () => import('./views/order/Page.vue'),
          meta: {
            rule: 'admin',
            breadcrumb: [{
              title: 'Home',
              url: '/'
            },
            {
              title: 'Business',
              url: '/business'
            },
            {
              title: 'Orders',
              active: true
            },
          ],
          pageTitle: 'Order List',
          }
        },
        {
          path: '/business/reservations',
          name: 'reservations',
          component: () => import('./views/reservation/Page.vue'),
          meta: {
            rule: 'admin',
            breadcrumb: [{
              title: 'Home',
              url: '/'
            },
            {
              title: 'Business',
              url: '/business'
            },
            {
              title: 'Reservations',
              active: true
            },
          ],
          pageTitle: 'Reservation List',
          }
        },
        {
          path: '/authorization',
          redirect: '/authorization/users'
        },
        {
          path: '/authorization/users',
          name: 'users',
          component: () => import('./views/Page2.vue'),
          meta: {
            rule: 'editor',
            breadcrumb: [{
              title: 'Home',
              url: '/'
            },
            {
              title: 'Authorization',
              url: '/authorization'
            },
            {
              title: 'Users',
              active: true
            },
          ],
          pageTitle: 'User List',
          }
        },
        {
          path: '/setting',
          redirect: '/setting/sites'
        },
        {
          path: '/setting/sites',
          name: 'sites',
          component: () => import('./views/setting/Page.vue'),
          meta: {
            rule: 'admin',
            breadcrumb: [{
              title: 'Home',
              url: '/'
            },
            {
              title: 'Setting',
              url: '/setting'
            },
            {
              title: 'Sites',
              active: true
            },
          ],
          pageTitle: 'Site List',
          }
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
      redirect: '/error-404'
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
