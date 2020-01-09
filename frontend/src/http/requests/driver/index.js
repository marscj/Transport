import {
  axios
} from '@/utils/request'

export function getDrivers(parameter) {
  return axios.get("drivers/", {
    params: parameter
  })
}

export function getDriver(pk) {
  return axios.get("drivers/" + `${pk}/`)
}

export function updateDriver(pk, data) {
  return axios.put("drivers/" + `${pk}/`, data)
}

export function createDriver(data) {
  return axios.post("drivers/", data)
}

export function deleteDriver(pk) {
  return axios.delete("drivers/" + `${pk}/`)
}