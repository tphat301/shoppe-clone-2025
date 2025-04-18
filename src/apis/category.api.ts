import { Category } from '../types/category.type'
import { SuccessResponseApi } from '../types/utils.type'
import http from '../utils/http'

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponseApi<Category[]>>('/categories')
  }
}

export default categoryApi
