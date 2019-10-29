import jwt from "@/http/requests/auth/jwt/index.js"
import router from '@/router'
import acl from '@/acl/acl'

export default {
  namespaced: true,
  state: {
    token: '',
    user: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },

    SET_USER: (state, user) => {
      state.user = user
    },
  },
  actions: {
    // JWT
    loginJWT({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        jwt.login(payload)
          .then(res => {
            // If there's user data in response
            const { result } = res;

            if (result.token) {
              // Navigate User to homepage
              // router.push(router.currentRoute.query.to || '/')

              // Set accessToken
              localStorage.setItem("accessToken", result.token)

              // Update user details
              commit('SET_USER', result.user)

              resolve(res)
            } else {
              reject({
                message: "Wrong Email or Password"
              })
            }

          })
          .catch(error => {
            reject(error)
          })
      })
    },

    registerUserJWT({ commit }, payload) {
      return new Promise((resolve, reject) => {
        
        if (payload.password1 !== payload.password2) {
          reject({
            message: "Password doesn't match. Please try again."
          })
        }

        jwt.registerUser(payload)
          .then(res => {

            const { result } = res;

            if (result.token) {
              router.push(router.currentRoute.query.to || '/')

              // Update data in localStorage
              localStorage.setItem("accessToken", result.token)

              // Update user details
              commit('SET_USER', result.user)
            }
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    logout() {
      if (localStorage.getItem("accessToken")) {
        localStorage.removeItem("accessToken")
      }

      acl.change('public')

      router.push('/login').catch(() => {})
    }
  }
}
