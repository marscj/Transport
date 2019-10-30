import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { constantRouterMap, defaultRoutePath } from './config'
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
  console.log('111111', document.cookie)

  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if(localStorage.getItem("Access-Token")) {
    if (to.path === '/login') {
      console.log('2222')
      next({ path: defaultRoutePath })
    } else {
      console.log('33333')
      if (store.getters.roles && store.getters.roles.length) {
        console.log('4444')
        store.dispatch('getInfo').then(res => {
          console.log('5555')
          const roles = res.result && res.result.role
          store.dispatch('GenerateRoutes', { roles }).then(() => {
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
      }
    }
  } else {
    console.log('66666')
    var whiteList = constantRouterMap.filter(f => {
      if(f.children) {
        return f.children.filter(f1 => {
          return f1.path === to.path
        }).length
      }
      return false
    })

    if(whiteList && whiteList.length) {
      console.log('77777')
      next()
    } else {
      console.log('88888', to.fullPath)
      next({ path: '/login', query: { redirect: to.fullPath } })
    }
  }
});

export default router
