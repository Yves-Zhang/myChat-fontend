import axios, { type AxiosResponse } from 'axios'
// import { useAuthStore } from '@/store'

let baseURL = import.meta.env.VITE_APP_API_BASE_URL

if (process.env.NODE_ENV === 'development') {
  // 开发环境逻辑
  baseURL = import.meta.env.VITE_APP_API_BASE_URL_DEV
}

const service = axios.create({
  // withCredentials: true, // 暂时不要这个 会造成跨域
  baseURL,
})

service.interceptors.request.use(
  (config) => {
    // const token = useAuthStore().token
    // if (token)
    //   config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200)
      return response

    throw new Error(response.status.toString())
  },
  (error) => {
    if (error.response.status === 401) {
      setTimeout(() => {
        window.location.href = 'https://ai.koudingtu.com/webapp/authPage/#/'
      }, 1000)
      return Promise.reject(new Error('登录失效，请重新登录'))
    }

    return Promise.reject(error)
  },
)

export default service
