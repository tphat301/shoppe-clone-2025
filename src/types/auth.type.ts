import { User } from './user.type'
import { SuccessResponseApi } from './utils.type'

type Data = {
  access_token: string
  refresh_token: string
  expires: number
  expires_refresh_token: number
  user: User
}

export type AuthResponse = SuccessResponseApi<Data>

export type RefreshTokenReponse = SuccessResponseApi<{ access_token: string }>
