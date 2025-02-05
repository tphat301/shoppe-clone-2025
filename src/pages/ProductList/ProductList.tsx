import { useQuery } from '@tanstack/react-query'
import { useQueryParams } from '../../hooks/useQueryParams'
import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import SortProductList from './SortProductList'
import productApi from '../../apis/product.api'

const ProductList = () => {
  const queryParams = useQueryParams()
  const data = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => productApi.getProducts(queryParams)
  })
  console.log(data)
  return (
    <div className='py-[60px] bg-gray-200'>
      <div className='wrap-content'>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {data &&
                data.data?.data.data.products.map((product, index) => (
                  <div className='col-span-1' key={index}>
                    <Product product={product} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
