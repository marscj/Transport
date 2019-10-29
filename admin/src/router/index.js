import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './config'

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
  if (
    to.path === "/login" ||
    to.path === "/forgot-password" ||
    to.path === "/error-404" ||
    to.path === "/error-500" ||
    to.path === "/register" ||
    to.path === "/not-authorized" ||
    localStorage.getItem("accessToken")
  ) {
    return next();
  } else {
    return next({path: '/login', query: { to: to.path }})
  }
});

export default router
