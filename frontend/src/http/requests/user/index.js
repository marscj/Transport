import {
  axios
} from '@/utils/request'

export function getUser(parameter) {
  return axios.get("users/", {
    params: parameter
  })
}

export function updateUser(pk, data) {
  return axios.put("users/" + `${pk}/`, data)
}

export function createUser(data) {
  return axios.post("users/", data)
}

export function changePassword(pk, data) {
  return axios.post("users/" + `${pk}/admin_change_password/`, data)
}

export function getGroup() {
  return axios.get("groups/")
}

export function updateGroups(pk, data) {
  return axios.put("groups/" + `${pk}/`, data)
}

export function createGroup(data) {
  return axios.post("groups/", data)
}

export function getPermission(parameter) {
  return axios.get("permissions/", {
    params: parameter
  })
}

export function updateGroup(pk, data) {
  return axios.put("groups/" + `${pk}/`, data)
}
