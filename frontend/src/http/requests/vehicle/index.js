import {
  axios
} from '@/utils/request'

export function getItinerary(parameter) {
  return axios.get("itineraryies/", {
    params: parameter
  })
}

export function updateItinerary(pk, data) {
  return axios.put("itineraryies/" + `${pk}/`, data)
}

export function createItinerary(data) {
  return axios.post("itineraryies/", data)
}

export function deleteItinerary(pk) {
  return axios.delete("itineraryies/" + `${pk}/`)
}

export function getCategory(parameter) {
  return axios.get("categoryies/", {
    params: parameter
  })
}

export function updateCategory(pk, data) {
  return axios.put("categoryies/" + `${pk}/`, data)
}

export function createCategory(data) {
  return axios.post("categoryies/", data)
}

export function deleteCategory(pk) {
  return axios.delete("categoryies/" + `${pk}/`)
}

export function getPrice(parameter) {
  return axios.get("prices/", {
    params: parameter
  })
}

export function getPriceExa(parameter) {
  return axios.get("prices/get_price/", {
    params: parameter
  })
}

export function updatePrice(pk, data) {
  return axios.put("prices/" + `${pk}/`, data)
}

export function createPrice(data) {
  return axios.post("prices/", data)
}

export function deletePrice(pk) {
  return axios.delete("prices/" + `${pk}/`)
}

export function getVehicle(parameter) {
  return axios.get("vehices/", {
    params: parameter
  })
}

export function updateVehicle(pk, data) {
  return axios.put("vehices/" + `${pk}/`, data)
}

export function createVehicle(data) {
  return axios.post("vehices/", data)
}

export function deleteVehicle(pk) {
  return axios.delete("vehices/" + `${pk}/`)
}

export function getSeats(parameter) {
  return axios.get("vehices/seats/", {
    params: parameter
  })
}