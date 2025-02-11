import { Purchase, PurchaseListStatus } from '../types/purchase.type'
import { SuccessResponseApi } from '../types/utils.type'
import http from '../utils/http'

const purchaseApi = {
  addToCart: (body: { product_id: string; buy_count: number }) =>
    http.post<SuccessResponseApi<Purchase>>('/purchases/add-to-cart', body),
  getPurchases: (params: { status: PurchaseListStatus }) =>
    http.get<SuccessResponseApi<Purchase[]>>('/purchases', { params })
}

export default purchaseApi
