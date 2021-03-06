import {
  axios
} from '@/utils/request'

export function getOrders(parameter) {
  return axios.get("orders/", {
    params: parameter
  })
}

export function getOrder(pk) {
  return axios.get("orders/" + `${pk}/`)
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

export function getOrderItinerary(parameter) {
  return axios.get("order_itinerary/", {
    params: parameter
  })
}

export function updateOrderItinerary(pk, data) {
  return axios.put("order_itinerary/" + `${pk}/`, data)
}

export function createOrderItinerary(data) {
  return axios.post("order_itinerary/", data)
}

export function deleteOrderItinerary(pk) {
  return axios.delete("order_itinerary/" + `${pk}/`)
}