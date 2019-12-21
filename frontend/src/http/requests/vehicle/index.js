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

export function getSeat(parameter) {
  return axios.get("seats/", {
    params: parameter
  })
}

export function updateSeat(pk, data) {
  return axios.put("seats/" + `${pk}/`, data)
}

export function createSeat(data) {
  return axios.post("seats/", data)
}

export function deleteSeat(pk) {
  return axios.delete("seats/" + `${pk}/`)
}

export function getPrice(parameter) {
  return axios.get("prices/", {
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