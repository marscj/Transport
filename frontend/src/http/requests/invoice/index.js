import {
  axios
} from '@/utils/request'

export function getInvoices(parameter) {
  return axios.get("invoices/", {
    params: parameter
  })
}

export function getInvoice(pk) {
  return axios.get("invoices/" + `${pk}/`)
}

export function updateInvoice(pk, data) {
  return axios.put("invoices/" + `${pk}/`, data)
}

export function createInvoice(data) {
  return axios.post("invoices/", data)
}

export function deleteInvoice(pk) {
  return axios.delete("invoices/" + `${pk}/`)
}