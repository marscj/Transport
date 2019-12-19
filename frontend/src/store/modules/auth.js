import Vue from 'vue'
import { login, info, register} from "@/http/requests/auth/index.js"
import router from '@/router' 
  
const auth = {
  state: {
    id: '',
    token: '',
    displayName: '',
    photoURL: '',
    groups: [] 
  },
  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },

    SET_TOKEN: (state, token) => {
      state.token = token;
    },

    SET_NAME: (state, name) => {
      state.displayName = name
    },

    SET_PHOTO: (state, url) => {
      state.photoURL = url
    },

    SET_GROUPS: (state, groups) => {
      state.groups = groups
    }
  },
  actions: {
    login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        login(payload)
          .then(res => {
            const { result } = res;

            if (result.token) {
              Vue.ls.set('accessToken', result.token)
              commit('SET_TOKEN', result.token)
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

    register({ commit }, payload) {
      return new Promise((resolve, reject) => {
        
        if (payload.password1 !== payload.password2) {
          reject({
            message: "Password doesn't match. Please try again."
          })
        }

        register(payload)
          .then(res => {
            const { result } = res;
            if (result.token) {
              commit('SET_TOKEN', result.token)
              Vue.ls.set("accessToken", result.token)
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
        info()
          .then(res => {
            const { result } = res;
            commit('SET_ID', result.id)
            commit('SET_GROUPS', result.groups)
            commit('SET_NAME', result.username)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    logout({ commit }) {
      commit('SET_TOKEN', '')
      Vue.ls.remove("accessToken")
      router.push('/login').catch(() => {})
    }
  }
}

export default auth