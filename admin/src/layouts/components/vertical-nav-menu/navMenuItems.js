export default [{
    header: "Dashboard",
    items: [{
      url: '/dashboard/analytics',
      name: "Analytics",
      slug: "analytics",
      i18n: "Analytics",
    }]
  },
  {
    header: "Business",
    items: [{
        url: '/business/orders',
        name: "Orders",
        slug: "orders",
        i18n: "Orders",
        icon: "FileTextIcon"
      },
      {
        url: '/business/reservations',
        name: "Reservations",
        slug: "reservations",
        i18n: "Reservations",
        icon: "BookOpenIcon"
      },
    ]
  },
  {
    header: "Resource",
    items: [{
        url: '/resource/drivers',
        name: "Drivers",
        slug: "drivers",
        i18n: "Drivers",
      },
      {
        url: '/resource/vehicles',
        name: "Vehicles",
        slug: "vehicles",
        i18n: "Vehicles",
      },
    ]
  },
  {
    header: "Authorizations",
    items: [{
      url: '/authorization/users',
      name: "Users",
      slug: "users",
      i18n: "Users",
      icon: "UsersIcon"
    }, {
      url: '/authorization/roles',
      name: "Roles",
      slug: "roles",
      i18n: "Roles",
      icon: "UserCheckIcon"
    }]
  },
  {
    header: "Settings",
    items: [{
        url: '/setting/sites',
        name: "Sites",
        slug: "sites",
        i18n: "Sites",
        icon: 'GlobeIcon'
      },
      {
        url: '/setting/faqs',
        name: "FAQS",
        slug: "faqs",
        i18n: "FAQS",
        icon: 'HelpCircleIcon',
      }
    ]
  },
]
