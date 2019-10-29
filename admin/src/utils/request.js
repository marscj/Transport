import axios from 'axios'
import { VueAxios } from './axios'
import store from '@/store'

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api', // api base_url
  timeout: 10000, // 请求超时时间
})

// Token Refresh
let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched(access_token) {
  subscribers = subscribers.filter(callback => callback(access_token))
}

function addSubscriber(callback) {
  subscribers.push(callback)
}

service.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  // const { config, response: { status } } = error
  const { config, response } = error
  const originalRequest = config

  // if (status === 401) {
  if (response && response.status === 401) {
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true
      store.dispatch("auth/fetchAccessToken")
        .then((access_token) => {
          isAlreadyFetchingAccessToken = false
          onAccessTokenFetched(access_token)
        })
    }

    const retryOriginalRequest = new Promise((resolve) => {
      addSubscriber(access_token => {
        originalRequest.headers.Authorization = 'Bearer ' + access_token
        resolve(axios(originalRequest))
      })
    })
    return retryOriginalRequest
  }
  return Promise.reject(error)
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
