import {
  asyncRouterMap,
  constantRouterMap
} from '@/router/config'

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission(permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i].content_type.model)
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

function filterGroup(groups) {
  if (groups) {
    return groups.reduce((f1, f2) => f1.concat(f2.permissions), []).filter(f => {
      return f.codename.includes('view_')
    })
  }
  return []
}

function filterAsyncRouter(routerMap, groups) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(groups, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, groups)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({
      commit
    }, res) {
      return new Promise(resolve => {
        const { groups } = res.result;
        const { is_superuser } = res.result;

        if (is_superuser) {
          commit('SET_ROUTERS', asyncRouterMap);
        } else {
          const _groups = filterGroup(groups);
          const accessedRouters = filterAsyncRouter(asyncRouterMap, _groups);
          commit('SET_ROUTERS', accessedRouters);
        }
        resolve();
      })
    },
  }
}

export default permission
