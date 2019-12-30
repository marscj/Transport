import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { constantRouterMap, asyncRouterMap, defaultRoutePath } from './config'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

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

var isAlreadyAddRouter = false

router.beforeEach((to, from, next) => {
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if(Vue.ls.get("accessToken")) {
    if (to.path === '/login') {
      next({ path: defaultRoutePath })
    } else {
      if (store.getters.groups.length === 0 && !isAlreadyAddRouter) {
        store.dispatch('getInfo').then(res => {
          store.dispatch('GenerateRoutes', res).then(() => {
            isAlreadyAddRouter = true
            if(res.result.is_superuser) {
              router.addRoutes(asyncRouterMap)
            } else {
              router.addRoutes(store.getters.addRouters)
            }     
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
