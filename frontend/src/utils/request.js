import Vue from 'vue'
import axios from 'axios'
import { VueAxios } from './axios'
import store from '@/store'

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api', // api base_url
  timeout: 10000, // 请求超时时间
})

service.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  const { response } = error

  if (response && response.status === 401) {
    store.dispatch('logout');
  }
  return Promise.reject(error)
})

service.interceptors.request.use(config => {
  const token = Vue.ls.get('accessToken')
  if (token) {
    config.headers['Authorization'] = 'JWT ' + token
  }
  return config
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
