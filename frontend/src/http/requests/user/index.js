import {
  axios
} from '@/utils/request'

export function getUsers(parameter) {
  return axios.get("users/", {
    params: parameter
  })
}

export function getRoles() {
  return axios.get("roles/")
}

export function getPermissions(parameter) {
  return axios.get("permissions/", {
    params: parameter
  })
}

export function updateRole(pk, data) {
  return axios.put("roles/" + `${pk}/`, data)
}
