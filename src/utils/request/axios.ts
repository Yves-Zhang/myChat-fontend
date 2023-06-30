import axios, { type AxiosResponse } from 'axios'
import { useAuthStore } from '@/store'

const baseURL = `http://127.0.0.1:8989${import.meta.env.VITE_GLOB_API_URL}`

const service = axios.create({
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
