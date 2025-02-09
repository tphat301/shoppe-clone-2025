import { Link } from 'react-router-dom'
import { Product as IProduct } from '../../../../types/product.type'
import {
  discountPercent,
  formatNumberCurrency,
  formatNumberToSocicalStyle,
  generateNameId
} from '../../../../utils/utils'
import ProductRating from '../../../../components/ProductRating'
import { path } from '../../../../constants/path'

interface Props {
  product: IProduct
}
const Product = ({ product }: Props) => {
  return (
    <Link to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`} className='relative'>
      <div className='bg-white shadow hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform'>
        <div className='w-full pt-[100%] relative'>
          <img className='w-full h-full absolute top-0 left-0 object-cover' src={product.image} alt={product.name} />
        </div>
        <div className='p-2'>
          <p className='line-clamp-2 min-h-[1.75rem] text-[#000]'>{product.name}</p>
          <div className='text-[rgba(238,77,45,1)] mt-1'>
            <span>₫ {formatNumberCurrency(product.price)}</span>
            <span className='text-xs line-through ml-1 text-gray-400'>
              ₫ {formatNumberCurrency(product.price_before_discount)}
            </span>
            {product.price_before_discount && (
              <span className='bg-[rgba(254,238,234,1)] text-[10px] px-1 py-0.5 ml-2 absolute top-2 right-2'>
                {discountPercent(product.price_before_discount, product.price)}
              </span>
            )}
          </div>
          <div className='mt-3 flex items-center'>
            <ProductRating rating={product.rating} />
            <p className='text-xs ml-2'>Đã bán {formatNumberToSocicalStyle(product.sold)}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
