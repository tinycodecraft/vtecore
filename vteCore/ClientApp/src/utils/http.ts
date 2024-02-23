import { ErrorOr, HubInit } from '@/constants/types'
import axios from 'axios'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import { store } from '@/hooks/store/configureStore'

function getToken() {
  const { token } = store.getState().dmHub ?? HubInit

  return token
}

function request<T>(config: AxiosRequestConfig): Promise<ErrorOr<T>> {
  return axios(config).then((response) => {
    return response.data as ErrorOr<T>
  })
}

function config(method: string): AxiosRequestConfig {
  const token = getToken()
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
    
  }
}

export async function post<T>(url: string, data: any): Promise<ErrorOr<T>> {
  return request<T>({
    ...config('POST'),
    url,
    data,
  })
}

export async function get<T>(url: string, data: any): Promise<ErrorOr<T>> {
  return request<T>({
    ...config('GET'),
    url,
    data,
  })
}
