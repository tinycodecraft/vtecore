import axios, { type AxiosInstance } from 'axios'
import type { ApiStatusEnum } from '@/constants/types/enums'
import { BASE_URL } from '@/constants/types/strings'

/**
 * Service API base class - configures default settings/error handling for inheriting class
 */
export abstract class BaseService {
  protected readonly $http: AxiosInstance
  protected readonly $wAuthHttp: AxiosInstance
  private _token = ''
  private _refreshToken = ''

  get token(): string {
    return this._token
  }
  set token(value: string) {
    this._token = value
  }

  get refreshToken(): string {
    return this._refreshToken
  }
  set refreshToken(value: string) {
    this._refreshToken = value
  }

  protected constructor(controller: string, timeout = 50000) {
    this.$http = axios.create({
      timeout,
      baseURL: `${BASE_URL}/api/${controller}/`,
    })

    this.$http.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log(error.config.url)
        console.log(JSON.stringify(error))
        return Promise.reject(error)
      },
    )
    this.$wAuthHttp = axios.create({
      timeout,
      baseURL: `${BASE_URL}/api/${controller}/`,
      withCredentials: true,
    })
    console.log(`the api url base is : ${BASE_URL}/api/${controller}`)

    this.$wAuthHttp.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`
        }

        return config
      },
      (error) => {
        console.log(JSON.stringify(error))
        return Promise.reject(error)
      },
    )

    this.$wAuthHttp.interceptors.response.use(
      (response) => response,
      async (error) => {
        const requestConfig = error.config
        if (error.response.status === 401 && !requestConfig._retry) {
          requestConfig._retry = true
        }
        try {
          if (this.refreshToken) {
            // const tokenstate = {Token: this.refreshToken} as TokenState;

            // const response = await AuthApi.getNewTokenAsync(tokenstate);
            // console.log(`the response from refresh ${response}`)
            //   if(response && response.status!=ApiStatusEnum.FAILURE)
            //   {
            //     this.token = response.newToken  ?? this.token
            //   }

            if (this.token) {
              requestConfig.headers.Authorization = `Bearer ${this.token}`
            }
            return axios(requestConfig)
          }
        } catch (error) {
          console.log(error)
        }
        return Promise.reject(error)
      },
    )
  }
}
