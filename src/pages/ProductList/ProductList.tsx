import { useQuery } from '@tanstack/react-query'
import { useQueryParams } from '../../hooks/useQueryParams'
import { omitBy, isUndefined } from 'lodash'
import { Fragment } from 'react'
import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import SortProductList from './SortProductList'
import productApi from '../../apis/product.api'
import Pagination from '../../components/Pagination'
import { ProductListConfig } from '../../types/product.type'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

const ProductList = () => {
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
      sort_by: queryParams.sort_by
    },
    isUndefined
  )
  const data = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    placeholderData: (previousData) => previousData
  })
  return (
    <div className='py-[60px] bg-gray-200'>
      <div className='wrap-content'>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            {data && (
              <Fragment>
                <SortProductList
                  queryConfig={queryConfig}
                  pageSize={data.data?.data.data.pagination.page_size as number}
                />
                <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                  {data.data?.data.data.products.map((product, index) => (
                    <div className='col-span-1' key={index}>
                      <Product product={product} />
                    </div>
                  ))}
                </div>
                <Pagination queryConfig={queryConfig} pageSize={data.data?.data.data.pagination.page_size as number} />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
