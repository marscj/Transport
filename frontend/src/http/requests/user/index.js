import { axios } from '@/utils/request'

export function getUsers() {
  return axios.get("users/")
}

export function getPermission() {
  return axios.get("permissions/")
}