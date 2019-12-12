import {
  axios
} from '@/utils/request'

export function getUsers(parameter) {
  return axios.get("users/", {
    params: parameter
  })
}

export function getPermissions(parameter) {
  return axios.get("permissions/", {
    params: parameter
  })
}
