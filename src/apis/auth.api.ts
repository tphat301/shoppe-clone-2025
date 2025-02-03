import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

const authApi = {
  register: (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body),
  login: (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body),
  logout: () => {}
}
export default authApi
