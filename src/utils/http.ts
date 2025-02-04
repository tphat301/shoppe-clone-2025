import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { httpStatusCode } from '../constants/httpStatusCode'
import { path } from '../constants/path'
import { AuthResponse } from '../types/auth.type'
import { clearAccessTokenFromLS, getAccessTokenFromLS, saveAccessTokenToLS } from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS() || ''
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login || url === path.register) {
          this.accessToken = (response.data as AuthResponse).data.access_token
          saveAccessTokenToLS(this.accessToken)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearAccessTokenFromLS()
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== httpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast(message)
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
