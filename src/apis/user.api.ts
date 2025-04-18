import { User } from '../types/user.type'
import { SuccessResponseApi } from '../types/utils.type'
import http from '../utils/http'

const URL = 'user'
interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  new_password?: string
}

const useApi = {
  getProfile() {
    return http.get<SuccessResponseApi<User>>('me')
  },
  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessResponseApi<User>>(`${URL}`, body)
  },
  uploadAvatar(body: FormData) {
    return http.post<SuccessResponseApi<string>>(`${URL}/upload-avatar`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default useApi
