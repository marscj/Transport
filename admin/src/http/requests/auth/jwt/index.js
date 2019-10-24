import { axios } from '@/utils/request'

export default {
  login(payload) {
    return axios.post("rest-auth/login/", payload)
  },
  registerUser(payload) {
    return axios.post("rest-auth/registration/", payload)
  },
}
