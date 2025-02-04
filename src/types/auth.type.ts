import { User } from './user.type'
import { SuccessResponseApi } from './utils.type'

type Data = {
  access_token: string
  refresh_token: string
  expires: string
  expires_refresh_token: string
  user: User
}

export type AuthResponse = SuccessResponseApi<Data>
