import { Order, SortBy } from '../constants/product'

export interface Product {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  category: {
    _id: string
    name: string
  }
  image: string
  createdAt: string
  updatedAt: string
}

export interface ProductList {
  products: Product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface ProductListConfig {
  page?: number
  limit?: number
  order?: Order.desc | Order.asc
  sort_by?: SortBy.createdAt | SortBy.view | SortBy.sold | SortBy.price
  exclude?: string
  rating_filter?: number
  price_max?: number
  price_min?: number
  name?: string
}
