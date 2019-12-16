export const defaultRoutePath = '/admin/analytics'

export const asyncRouterMap = [{
    path: '/admin',
    redirect: '/admin/analytics',
    component: () => import('@/layouts/main/Main.vue'),
    meta: {
      header: 'Dashboard',
      // submenu: true,
      // name: 'Analytics',
      // slug: 'analytics',
      i18n: 'Dashboard',
      // icon: 'HomeIcon',
      // permission: [ 'user' ],
    },
    children: [{
      path: '/admin/analytics',
      name: 'analytics',
      component: () => import('@/views/dashboard/analytics/Page.vue'),
      meta: {
        name: 'Analytics',
        url: '/admin/analytics',
        slug: 'analytics',
        i18n: 'Analytics',
        icon: 'HomeIcon',
        breadcrumb: [{
            title: 'Dashboard',
            url: '/admin/analytics'
          },
          {
            title: 'Analytics',
            active: true
          }
        ],
      }
    }]
  },
  {
    path: '/admin/order',
    redirect: '/admin/orders',
    component: () => import('@/layouts/main/Main.vue'),
    meta: {
      header: 'Order',
      i18n: 'Order',
    },
    children: [{
      path: '/admin/orders',
      name: 'orders',
      component: () => import('@/views/business/order/Page.vue'),
      meta: {
        name: 'Order',
        url: '/admin/orders',
        slug: 'orders',
        i18n: 'OrderList',
        icon: 'FileTextIcon',
        breadcrumb: [{
            title: 'Order',
            url: '/admin/orders'
          },
          {
            title: 'Orders',
            active: true
          }
        ],
      }
    }]
  },
  {
    path: '/admin/user',
    redirect: '/admin/users',
    component: () => import('@/layouts/main/Main.vue'),
    meta: {
      header: 'User',
      i18n: 'User',
      // permission: [ 'user', 'role' ],
    },
    children: [{
        path: '/admin/users',
        name: 'users',
        component: () => import('@/views/user/List.vue'),
        meta: {
          name: 'User',
          url: '/admin/users',
          slug: 'users',
          i18n: 'User',
          icon: 'UsersIcon',
          // permission: [ 'user' ],
          breadcrumb: [{
              title: 'User',
              url: '/admin/users'
            },
            {
              title: 'Users',
              active: true
            }
          ],
        }
      },
      {
        path: '/admin/roles',
        name: 'roles',
        component: () => import('@/views/role/Page.vue'),
        meta: {
          name: 'Role',
          url: '/admin/roles',
          slug: 'role',
          i18n: 'Role',
          icon: 'UserPlusIcon',
          permission: [ 'role' ],
          breadcrumb: [{
              title: 'User',
              url: '/admin/users'
            },
            {
              title: 'Roles',
              active: true
            }
          ],
        }
      },
    ]
  },
  {
    path: '/admin/source',
    redirect: '/admin/drivers',
    component: () => import('@/layouts/main/Main.vue'),
    meta: {
      header: 'Source',
      i18n: 'Source',
    },
    children: [{
        path: '/admin/drivers',
        name: 'staf',
        component: () => import('@/views/resource/driver/Page.vue'),
        meta: {
          name: 'Driver',
          url: '/admin/drivers',
          slug: 'driver',
          i18n: 'Driver',
          icon: 'UserCheckIcon',
          breadcrumb: [{
              title: 'Source',
              url: '/admin/drivers'
            },
            {
              title: 'Drivers',
              active: true
            }
          ],
        }
      },
      {
        path: '/admin/vehicles',
        name: 'vehicles',
        component: () => import('@/views/resource/vehicle/Page.vue'),
        meta: {
          name: 'Vehicle',
          url: '/admin/vehicles',
          slug: 'vehicle',
          i18n: 'Vehicle',
          icon: 'TruckIcon',
          breadcrumb: [{
              title: 'Source',
              url: '/admin/drivers'
            },
            {
              title: 'Vehicles',
              active: true
            }
          ],
        }
      },
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  }
]

export const constantRouterMap = [{
    path: '/',
    redirect: '/home',
    component: () => import('@/layouts/full-page/FullPage.vue'),
    children: [{
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/Login.vue'),
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/register/Register.vue'),
      },
      {
        path: '/forgot-password',
        name: 'forgot-password',
        component: () => import('@/views/register/ForgotPassword.vue'),
      },
      {
        path: '/reset-password',
        name: 'reset-password',
        component: () => import('@/views/register/ResetPassword.vue'),
      },
      {
        path: '/rest-auth/registration/account-confirm-email',
        name: 'verify-email',
        component: () => import('@/views/register/VerifyEmail.vue'),
      },
      {
        path: '/error-404',
        name: 'error-404',
        component: () => import('@/views/Error404.vue'),
      },
      {
        path: '/error-500',
        name: 'error-500',
        component: () => import('@/views/Error500.vue'),
      },
      {
        path: '/not-authorized',
        name: 'not-authorized',
        component: () => import('@/views/NotAuthorized.vue'),
      },
    ]
  },
  {
    path: '/404',
    redirect: '/error-404'
  }
]
