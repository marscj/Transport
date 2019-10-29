import jwt from "@/http/requests/auth/jwt/index.js"
import router from '@/router'

const auth = {
  state: {
    id: '',
    token: '',
    name: '',
    photoURL: '',
    roles: []
  },
  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },

    SET_TOKEN: (state, token) => {
      state.token = token;
    },

    SET_NAME: (state, name) => {
      state.name = name
    },

    SET_PHOTO: (state, url) => {
      state.photoURL = url
    },

    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    loginJWT({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        jwt.login(payload)
          .then(res => {
            const { result } = res;
            if (result.token) {
              localStorage.setItem("accessToken", result.token)

              commit('SET_ID', result.user.id)

              commit('SET_TOKEN', result.token)

              commit('SET_ID', result.user.id)

              commit('SET_ROLES', result.user.roles)

              dispatch("GenerateRoutes", result.user.roles)

              router.push(router.currentRoute.query.to || '/')

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

    registerJWT({ commit }, payload) {
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

    getInfo({ commit }) {
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
      router.push('/login').catch(() => {})
    }
  }
}

export default auth