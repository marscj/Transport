import { axios } from '@/utils/request'

export function login(payload) {
  return axios.post("rest-auth/login/", payload)
}

export function info() {
  return axios.get("users/info/")
}

export function register(payload) {
  return axios.post("rest-auth/registration/", payload)
}