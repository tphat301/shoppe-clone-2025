import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

const authApi = {
  register: (body: { email: string; password: string }) => http.post<AuthResponse>('/rregister', body),
  login: () => {},
  logout: () => {}
}
export default authApi
