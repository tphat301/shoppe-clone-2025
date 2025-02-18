import { Purchase, PurchaseListStatus } from '../types/purchase.type'
import { SuccessResponseApi } from '../types/utils.type'
import http from '../utils/http'

const purchaseApi = {
  addToCart: (body: { product_id: string; buy_count: number }) =>
    http.post<SuccessResponseApi<Purchase>>('/purchases/add-to-cart', body),
  getPurchases: (params: { status: PurchaseListStatus }) =>
    http.get<SuccessResponseApi<Purchase[]>>('/purchases', { params }),
  buyPurchases: (body: { product_id: string; buy_count: number }[]) =>
    http.post<SuccessResponseApi<Purchase[]>>('/purchases/buy-products', body),
  updatePurchase: (body: { product_id: string; buy_count: number }) =>
    http.put<SuccessResponseApi<Purchase>>('/purchases/update-purchase', body),
  deletePurchase: (purchaseIds: string[]) =>
    http.delete<SuccessResponseApi<{ deleted_count: number }>>('/purchases', {
      data: purchaseIds
    })
}

export default purchaseApi
