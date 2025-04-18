import { isUndefined, omitBy } from 'lodash'
import { useQueryParams } from './useQueryParams'
import { ProductListConfig } from '../types/product.type'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

const useQueryConfig = () => {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      sort_by: queryParams.sort_by,
      category: queryParams.category
    },
    isUndefined
  )
  return queryConfig
}

export default useQueryConfig
