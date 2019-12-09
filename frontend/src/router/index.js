import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { constantRouterMap, asyncRouterMap, defaultRoutePath } from './config'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'

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
  routes: constantRouterMap,
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = "none";
  }
})

router.beforeEach((to, from, next) => {
  console.log('from=', from.path, 'to=', to.path)
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if(Vue.ls.get("accessToken")) {
    if (to.path === '/login') {
      next({ path: defaultRoutePath })
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('getInfo').then(res => {
          const roles = res.roles
          store.dispatch('GenerateRoutes', roles).then(() => {
            router.addRoutes(store.getters.addRouters)
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              next({ ...to, replace: true })
            } else {
              next({ path: redirect })
            }
          })
        })
        .catch(() => {
          store.dispatch('logout').then(() => {
            next({ path: '/login', query: { redirect: to.fullPath } })
          })
        })
      } else {
        next()
      }
    }
  } else {
    var whiteList = filterWhilteList(constantRouterMap, to)
    if(whiteList && whiteList.length) {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } })
    }
  }
});

function filterWhilteList(list, to) {
  return list.reduce((f, item) => item.children ? f.concat(item.children) : f.concat(item), []).filter(f => {
    return f.path.includes(to.path)
  });
}

export default router
