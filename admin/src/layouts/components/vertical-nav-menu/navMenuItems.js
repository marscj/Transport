/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [{
    url: "/dashboard",
    name: "Dashboard",
    tagColor: "warning",
    icon: "HomeIcon",
    i18n: "Dashboard",
    submenu: [{
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
        icon: "UserIcon"
      },
      {
        url: '/business/reservations',
        name: "Reservations",
        slug: "reservations",
        i18n: "Reservations",
        icon: "UserIcon"
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
      icon: "UserIcon"
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
    }]
  },
]
