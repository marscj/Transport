import { axios } from '@/utils/request'

export default {
  login(payload) {
    return axios.post("rest-auth/login/", payload)
  },
  info() {
    return axios.get("rest-auth/login/")
  },
  registerUser(payload) {
    return axios.post("rest-auth/registration/", payload)
  },
}
