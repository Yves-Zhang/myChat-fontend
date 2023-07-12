import type { AxiosProgressEvent, AxiosResponse, GenericAbortSignal } from 'axios'
import CryptoJS from 'crypto-js'
import Cookies from 'cookiejs'
import request from './axios'
import { useAuthStore } from '@/store'
// 加密函数
function encryptData(data: string, key: string) {
  const encrypted = CryptoJS.AES.encrypt(data, key)
  return encrypted.toString()
}

export interface HttpOption {
  url: string
  data?: any
  method?: string
  headers?: any
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
  signal?: GenericAbortSignal
  beforeRequest?: () => void
  afterRequest?: () => void
}

export interface Response<T = any> {
  data: T
  message: string | null
  status: string
  code?: string
}

function http<T = any>(
  { url, data, method, headers, onDownloadProgress, signal, beforeRequest, afterRequest }: HttpOption,
) {
  const successHandler = (res: AxiosResponse<Response<T>>) => {
    const authStore = useAuthStore()

    // 兼容java接口
    if (res.data.code === 'success')
      return res.data

    if (res.data.status === 'Success' || typeof res.data === 'string')
      return res.data

    if (res.data.status === 'Unauthorized') {
      authStore.removeToken()
      window.location.href = 'https://ai.koudingtu.com/webapp/authPage/#/'
    }

    return Promise.reject(res.data)
  }

  const failHandler = (error: Response<Error>) => {
    afterRequest?.()
    throw new Error(error?.message || 'Error')
  }

  beforeRequest?.()

  method = method || 'GET'

  const params = Object.assign(typeof data === 'function' ? data() : data ?? {}, {})

  const keyJson = {
    timer: new Date().getTime(),
    domain: window.location.host,
  }

  const key = encryptData(`${JSON.stringify(keyJson)}`, 'koudingtu2023')
  const { token } = Cookies.all()

  if (!token)
    window.location.href = 'https://ai.koudingtu.com/webapp/authPage/#/'

  const CustomHeaders = {
    ...headers,
    'X-Custom-Header': key,
    'Authorization': `${token}`,
  }

  return method === 'GET'
    ? request.get(url, { headers: { ...CustomHeaders }, params, signal, onDownloadProgress }).then(successHandler, failHandler)
    : request.post(url, params, { headers: { ...CustomHeaders }, signal, onDownloadProgress }).then(successHandler, failHandler)
}

export function get<T = any>(
  { url, data, method = 'GET', onDownloadProgress, signal, beforeRequest, afterRequest }: HttpOption,
): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest,
  })
}

export function post<T = any>(
  { url, data, method = 'POST', headers, onDownloadProgress, signal, beforeRequest, afterRequest }: HttpOption,
): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    headers,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest,
  })
}

export default post
