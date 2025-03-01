import { Fragment } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product/Product'
import SortProductList from './components/SortProductList'
import productApi from '../../apis/product.api'
import Pagination from '../../components/Pagination'
import { ProductListConfig } from '../../types/product.type'
import useQueryConfig from '../../hooks/useQueryConfig'
import categoryApi from '../../apis/category.api'
import { Helmet } from 'react-helmet-async'

const ProductList = () => {
  const queryConfig = useQueryConfig()
  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getCategories
  })
  const categories = categoriesData?.data.data || []
  return (
    <Fragment>
      <Helmet>
        <title>Product List</title>
        <meta name='description' content='This is a page product list' />
      </Helmet>
      <div className='py-[60px] bg-gray-200'>
        <div className='wrap-content'>
          <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-3'>
              <AsideFilter queryConfig={queryConfig} categories={categories} />
            </div>
            <div className='col-span-9'>
              {productData && (
                <Fragment>
                  <SortProductList queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
                  <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                    {productData.data.data.products.map((product, index) => (
                      <div className='col-span-1' key={index}>
                        <Product product={product} />
                      </div>
                    ))}
                  </div>
                  <Pagination queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ProductList
