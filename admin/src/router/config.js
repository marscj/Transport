export const asyncRouterMap = [{
    path: '',
    component: () => import('@/layouts/main/Main.vue'),
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
        component: () => import('@/views/dashboard/analytics/Page.vue'),
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
        component: () => import('@/views/business/order/Page.vue'),
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
        component: () => import('@/views/business/reservation/Page.vue'),
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
        path: '/resource',
        redirect: '/resource/staffs'
      },
      {
        path: '/resource/staffs',
        name: 'staffs',
        component: () => import('@/views/resource/staff/Page.vue'),
        meta: {
          rule: 'admin',
          breadcrumb: [{
              title: 'Home',
              url: '/'
            },
            {
              title: 'Resource',
              url: '/resource'
            },
            {
              title: 'Staffs',
              active: true
            },
          ],
          pageTitle: 'Staff List',
        }
      },
      {
        path: '/resource/vehicles',
        name: 'vehicles',
        component: () => import('@/views/resource/vehicle/Page.vue'),
        meta: {
          rule: 'admin',
          breadcrumb: [{
              title: 'Home',
              url: '/'
            },
            {
              title: 'Resource',
              url: '/resource'
            },
            {
              title: 'Vehicles',
              active: true
            },
          ],
          pageTitle: 'Vehicle List',
        }
      },
      {
        path: '/authorization',
        redirect: '/authorization/users'
      },
      {
        path: '/authorization/users',
        name: 'users',
        component: () => import('@/views/authorization/user/Page.vue'),
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
        path: '/authorization/roles',
        name: 'roles',
        component: () => import('@/views/authorization/role/Page.vue'),
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
              title: 'Roles',
              active: true
            },
          ],
          pageTitle: 'Role List',
        }
      },
      {
        path: '/setting',
        redirect: '/setting/sites'
      },
      {
        path: '/setting/sites',
        name: 'sites',
        component: () => import('@/views/setting/site/Page.vue'),
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
      {
        path: '/setting/faqs',
        name: 'faqs',
        component: () => import('@/views/setting/faq/Page.vue'),
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
              title: 'FAQS',
              active: true
            },
          ],
          pageTitle: 'FAQ List',
        }
      },
    ],
  },

]

export const constantRouterMap = [{
    path: '',
    component: () => import('@/layouts/full-page/FullPage.vue'),
    children: [{
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/Login.vue'),
        meta: {
          rule: 'public'
        }
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/register/Register.vue'),
        meta: {
          rule: 'public'
        }
      },
      {
        path: '/forgot-password',
        name: 'forgot-password',
        component: () => import('@/views/register/ForgotPassword.vue'),
        meta: {
          rule: 'public'
        }
      },
      {
        path: '/reset-password',
        name: 'reset-password',
        component: () => import('@/views/register/ResetPassword.vue'),
        meta: {
          rule: 'public'
        }
      },
      {
        path: '/rest-auth/registration/account-confirm-email',
        name: 'verify-email',
        component: () => import('@/views/register/VerifyEmail.vue'),
        meta: {
          rule: 'public'
        }
      },
      {
        path: '/error-404',
        name: 'error-404',
        component: () => import('@/views/Error404.vue'),
        meta: {
          rule: 'public'
        }
      },
      {
        path: '/error-500',
        name: 'error-500',
        component: () => import('@/views/Error500.vue'),
        meta: {
          rule: 'public'
        }
      },
      {
        path: '/not-authorized',
        name: 'not-authorized',
        component: () => import('@/views/NotAuthorized.vue'),
        meta: {
          rule: 'public'
        }
      },
    ]
  },
  {
    path: '*',
    redirect: '/error-404'
  }
]
