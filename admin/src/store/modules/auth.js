import { axios } from '@/utils/request'
import jwt from "@/http/requests/auth/jwt/index.js"
import router from '@/router'
import acl from '@/acl/acl'

export default {
  namespaced: true,
  state: {
    isUserLoggedIn: () => {
      return localStorage.getItem('userInfo')
    },
  },
  mutations: {
    SET_BEARER(state, accessToken) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
    }
  },
  actions: {
    // JWT
    loginJWT({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        jwt.login(payload)
          .then(response => {
            console.log(response)
            // If there's user data in response
            if (response.data.token) {
              // Navigate User to homepage
              router.push(router.currentRoute.query.to || '/')

              // Set accessToken
              localStorage.setItem("accessToken", response.data.token)

              // Update user details
              commit('UPDATE_USER_INFO', response.data.user)

              // Set bearer token in axios
              commit("SET_BEARER", response.data.token)

              resolve(response)
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

    registerUserJWT({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {

        if (payload.password1 !== payload.password2) {
          reject({
            message: "Password doesn't match. Please try again."
          })
        }

        jwt.registerUser(payload)
          .then(response => {
            if (response.data.token) {
              router.push(router.currentRoute.query.to || '/')

              // Update data in localStorage
              localStorage.setItem("accessToken", response.data.token)

              // Update user details
              commit('UPDATE_USER_INFO', response.data.user)

              // Set bearer token in axios
              commit("SET_BEARER", response.data.token)
            }
            resolve(response)
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

      if (localStorage.getItem("userInfo")) {
        localStorage.removeItem('userInfo')
      }

      acl.change('public')

      router.push('/login').catch(() => {})
    }
  }
}
