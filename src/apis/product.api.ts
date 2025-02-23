import { Product, ProductList, ProductListConfig } from '../types/product.type'
import { SuccessResponseApi } from '../types/utils.type'
import http from '../utils/http'

const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponseApi<ProductList>>('/products', { params })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponseApi<Product>>(`/products/${id}`)
  }
}

export default productApi
