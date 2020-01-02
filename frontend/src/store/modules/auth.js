import Vue from 'vue'
import { login, info, register} from "@/http/requests/auth/index.js"
import router from '@/router' 
  
const auth = {
  state: {
    id: '',
    token: '',
    displayName: '',
    photoURL: '',
    groups: [],
    is_superuser: false,
    has_info: false,
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
    },

    SET_SUPERUSER: (state, is_superuser) => {
      state.is_superuser = is_superuser
    },

    SET_HAS_INFO: (state, info) => {
      state.has_info = info
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
              commit('SET_HAS_INFO', false)
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
              Vue.ls.set("accessToken", result.token)
              commit('SET_TOKEN', result.token)
              commit('SET_HAS_INFO', false)
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
            commit('SET_SUPERUSER', result.is_superuser)
            commit('SET_HAS_INFO', true)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    logout({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_GROUPS', [])
      commit('SET_NAME', '')
      commit('SET_SUPERUSER', false)
      commit('SET_HAS_INFO', false)
      Vue.ls.remove("accessToken")
      router.push('/login').catch(() => {})
    }
  }
}

export default auth