// axios
import axios from 'axios'
import VueAxios from './axios'

const service =  axios.create({
  baseURL: '/api',
  timeout: 10000,
})

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}