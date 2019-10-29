import jwt from "@/http/requests/auth/jwt/index.js"
import router from '@/router'
import acl from '@/acl/acl'

const auth = {
  namespaced: true,
  state: {
    token: '',
    user: {
      name: '',
      photoURL: '',
      groups: []
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },

    SET_USER: (state, user) => {
      state.user.name = user.name;
      state.user.photoURL = user.photoURL;
      state.user.groups = user.groups;
    },
  },
  actions: {
    Login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        jwt.login(payload)
          .then(res => {
            const { result } = res;
            if (result.token) {
              // router.push(router.currentRoute.query.to || '/')
              localStorage.setItem("accessToken", result.token)
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
              localStorage.setItem("accessToken", result.token)
              commit('SET_USER', result.user)
            }
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        jwt.info()
          .then(res => {
            const { result } = res;

            if (result.token) {
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

    logout() {
      if (localStorage.getItem("accessToken")) {
        localStorage.removeItem("accessToken")
      }

      acl.change('public')

      router.push('/login').catch(() => {})
    }
  }
}

export default auth