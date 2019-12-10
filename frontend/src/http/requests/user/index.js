import { axios } from '@/utils/request'

export function getRoles() {
  return axios.get("roles/")
}