import DOMPurify from 'dompurify'
import { toast } from 'react-toastify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from '../../apis/product.api'
import { Product as TypeProduct, ProductListConfig } from '../../types/product.type'
import { discountPercent, formatNumberCurrency, formatNumberToSocicalStyle, getIdFromNameId } from '../../utils/utils'
import Product from '../ProductList/components/Product'
import QuantityController from '../../components/QuantityController'
import purchaseApi from '../../apis/purchase.api'
import { purchaseStatus } from '../../constants/purchase'
import { path } from '../../constants/path'
import { useTranslation } from 'react-i18next'

const ProductDetail = () => {
  const { t } = useTranslation('product')
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [buyCount, setBuyCount] = useState(1)
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const imageRef = useRef<HTMLImageElement>(null)
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [currentImagesActive, setCurrentImagesActive] = useState('')
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = productDetailData?.data.data
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )

  const queryConfig: ProductListConfig = {
    page: '1',
    limit: '20',
    category: product?.category._id
  }
  const { data: productByCategory } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(product)
  })

  useEffect(() => {
    if (product && product.images.length) setCurrentImagesActive(product.images[0])
  }, [product])

  const chooseActiveImage = (image: string) => {
    setCurrentImagesActive(image)
  }

  const prev = () => {
    if (currentIndexImages[0] > 0) setCurrentIndexImages((prevState) => [prevState[0] - 1, prevState[1] - 1])
  }

  const next = () => {
    if (currentIndexImages[1] < (product as TypeProduct).images.length) {
      setCurrentIndexImages((prevState) => [prevState[0] + 1, prevState[1] + 1])
    }
  }

  const handleZoomIn = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { offsetX, offsetY } = event.nativeEvent
    const { naturalWidth, naturalHeight } = image
    const left = offsetX * (1 - naturalWidth / rect.width)
    const top = offsetY * (1 - naturalHeight / rect.height)
    image.style.width = `${naturalWidth}px`
    image.style.height = `${naturalHeight}px`
    image.style.maxWidth = 'unset'
    image.style.left = `${left}px`
    image.style.top = `${top}px`
  }

  const handleZoomOut = () => {
    const image = imageRef.current as HTMLImageElement
    image.removeAttribute('style')
  }

  const handleBuyCount = (value: number) => setBuyCount(value)

  const addToCartMutation = useMutation({
    mutationFn: purchaseApi.addToCart
  })

  const handleAddToCart = () => {
    addToCartMutation.mutate(
      { buy_count: buyCount, product_id: (product as TypeProduct)._id },
      {
        onSuccess: (data) => {
          toast(data.data.message, { autoClose: 1000 })
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchaseStatus.cartIn }] })
        }
      }
    )
  }

  const handleBuyNow = async () => {
    const respone = await addToCartMutation.mutateAsync({
      buy_count: buyCount,
      product_id: (product as TypeProduct)._id
    })
    const purchase = respone.data.data
    navigate(path.cart, {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  if (!product) return null
  return (
    <div className='bg-gray-100 py-3'>
      <div className='wrap-content'>
        <div className='bg-white p-4 grid grid-cols-12 gap-6 shadow'>
          <div className='col-span-5'>
            <div
              className='w-full pt-[100%] hover:cursor-zoom-in relative overflow-hidden z-10'
              onMouseMove={handleZoomIn}
              onMouseLeave={handleZoomOut}
            >
              <img
                className='w-full h-full pointer-events-none absolute top-0 left-0 object-cover'
                src={currentImagesActive}
                alt={product.name}
                ref={imageRef}
              />
            </div>
            <div className='relative my-2'>
              <button
                className='bg-black/30 text-white absolute left-[5px] top-1/2 -translate-y-1/2 z-10 w-5 h-10 hover:cursor-pointer hover:bg-black duration-200'
                onClick={prev}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='size-5'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </button>
              <div className='grid grid-cols-5'>
                {currentImages.map((img) => {
                  const isActice = img === currentImagesActive
                  return (
                    <div
                      className='p-1 col-span-1 hover:cursor-pointer'
                      key={img}
                      onMouseEnter={() => chooseActiveImage(img)}
                    >
                      <div className='relative w-full pt-[100%]'>
                        <img className='w-full h-full absolute top-0 left-0 object-cover' src={img} alt={img} />
                        {isActice && <div className='border-2 border-[#f53d2d] absolute inset-0 w-full h-full' />}
                      </div>
                    </div>
                  )
                })}
              </div>
              <button
                className='bg-black/30 text-white absolute right-[5px] top-1/2 -translate-y-1/2 z-10 w-5 h-10 hover:cursor-pointer hover:bg-black duration-200'
                onClick={next}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='size-5'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </button>
            </div>
          </div>
          <div className='col-span-7'>
            <h2 className='capitalize font-normal text-black text-xl'>{product.name}</h2>
            <div className='py-2 text-base'>
              Giá:
              <span className='text-red-500 font-semibold'> {formatNumberCurrency(product.price)} ₫</span>
              <span className='text-xs line-through ml-1 text-gray-400'>
                {formatNumberCurrency(product.price_before_discount)} ₫
              </span>
              <span className='bg-[rgba(254,238,234,1)] text-xs px-2 py-1 ml-2 text-red-600'>
                {discountPercent(product.price_before_discount, product.price)}
              </span>
            </div>
            <div className='py-2 text-base'>
              {t('product available')}:<span className='text-black font-semibold'> {product.quantity}</span>
            </div>
            <div className='py-2 text-base'>
              Đã bán:
              <span className='text-black font-semibold'> {formatNumberToSocicalStyle(product.sold)}</span>
            </div>
            <div className='py-2'>
              Số lượng:
              <QuantityController
                value={buyCount}
                max={product.quantity}
                onIncrease={handleBuyCount}
                onDecrease={handleBuyCount}
                onType={handleBuyCount}
              />
            </div>
            <div className='flex flex-wrap gap-3 py-2'>
              <button
                onClick={handleAddToCart}
                className='capitalize text-red-600 rounded-sm border-1 border-red-600 bg-[rgba(208,1,27,.08)] px-3 py-2 hover:cursor-pointer duration-200 hover:bg-red-600 hover:text-white text-base'
              >
                Thêm vào giỏ hàng
              </button>
              <button
                onClick={handleBuyNow}
                className='capitalize text-red-600 rounded-sm border-1 border-red-600 bg-[rgba(208,1,27,.08)] px-3 py-2 hover:cursor-pointer duration-200 hover:bg-red-600 hover:text-white text-base'
              >
                Mua ngay
              </button>
            </div>
          </div>
          <div className='col-span-12'>
            <strong className='text-base'>Mô tả sản phẩm:</strong>
            <div
              className='text-black'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description)
              }}
            />
          </div>
          <div className='col-span-12'>
            <h3 className='capitalize text-lg'>Sản phẩm liên quan</h3>
            {productByCategory && (
              <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {productByCategory.data.data.products.map((product, index) => (
                  <div className='col-span-1' key={index}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
