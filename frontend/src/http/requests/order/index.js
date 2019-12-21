import {
  axios
} from '@/utils/request'

export function getOrder(parameter) {
  return axios.get("orders/", {
    params: parameter
  })
}

export function updateOrder(pk, data) {
  return axios.put("orders/" + `${pk}/`, data)
}

export function createOrder(data) {
  return axios.post("orders/", data)
}

export function deleteOrder(pk) {
  return axios.delete("orders/" + `${pk}/`)
}

