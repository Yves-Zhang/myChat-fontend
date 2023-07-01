import axios, { type AxiosResponse } from 'axios'
import { useAuthStore } from '@/store'

let baseURL = import.meta.env.VITE_APP_API_BASE_URL + import.meta.env.VITE_GLOB_API_URL

if (process.env.NODE_ENV === 'development') {
  // 开发环境逻辑
  baseURL = `${import.meta.env.VITE_APP_API_BASE_URL_DEV}${+import.meta.env.VITE_GLOB_API_URL}`
}

const service = axios.create({
  withCredentials: true,
  baseURL,
})

service.interceptors.request.use(
  (config) => {
    const token = useAuthStore().token
    if (token)
      config.headers.Authorization = `Bearer ${token}`
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
    return Promise.reject(error)
  },
)

export default service
