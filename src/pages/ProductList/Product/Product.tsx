import { Link } from 'react-router-dom'
import { Product as IProduct } from '../../../types/product.type'
import { discountPercent, formatNumberCurrency, formatNumberToSocicalStyle } from '../../../utils/utils'
interface Props {
  product: IProduct
}
const Product = ({ product }: Props) => {
  return (
    <Link to='' className='relative'>
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
            <div className='flex items-center'>
              <div className='relative'>
                <div
                  className='absolute top-0 left-0 h-full overflow-hidden'
                  style={{
                    width: '55.5%'
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='size-3 fill-[#ffb720]'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='size-3 fill-[#ccc]'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </div>
            <p className='text-xs ml-2'>Đã bán {formatNumberToSocicalStyle(product.sold)}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
