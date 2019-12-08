export const defaultRoutePath = '/admin/dashboard/analytics'

export const asyncRouterMap = [{
  path: '/admin',
  redirect: '/admin/dashboard',
  component: () => import('@/layouts/main/Main.vue'),
  children: [{
      path: '/admin/dashboard',
      redirect: defaultRoutePath,
      meta: {
        permission: ['customuser'],
      },
    },
    {
      path: defaultRoutePath,
      name: 'analytics',
      component: () => import('@/views/dashboard/analytics/Page.vue'),
      meta: {
        permission: ['customuser'],
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
      redirect: '/business/orders',
      meta: {
        permission: ['customuser'],
      },
      children: [{
          path: '/business/orders',
          name: 'orders',
          component: () => import('@/views/business/order/Page.vue'),
          meta: {
            permission: ['customuser'],
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
            permission: ['customuser'],
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
      ]
    },
    {
      path: '/resource',
      redirect: '/resource/staffs',
      meta: {
        permission: ['customuser'],
      },
      children: [{
          path: '/resource/staffs',
          name: 'staffs',
          component: () => import('@/views/resource/staff/Page.vue'),
          meta: {
            permission: ['customuser'],
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
            permission: ['customuser'],
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
      ]
    },
    {
      path: '/authorization',
      redirect: '/authorization/users',
      meta: {
        permission: ['customuser'],
      },
      children: [{
          path: '/authorization/users',
          name: 'users',
          component: () => import('@/views/authorization/user/Page.vue'),
          meta: {
            permission: ['customuser'],
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
            permission: ['customuser'],
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
      ]
    },
    {
      path: '/setting',
      redirect: '/setting/sites',
      meta: {
        permission: ['admin']
      },
      children: [{
          path: '/setting/sites',
          name: 'sites',
          component: () => import('@/views/setting/site/Page.vue'),
          meta: {
            permission: ['customuser'],
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
            permission: ['customuser'],
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
        }
      ]
    }
  ]
}]

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
    path: '*',
    redirect: '/error-404'
  },
  {
    path: '*1',
    redirect: '/error-404'
  },
]
