import { Link } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import { useQuery } from '@tanstack/react-query'
import { path } from '../../constants/path'
import QuantityController from '../../components/QuantityController'
import { purchaseStatus } from '../../constants/purchase'
import purchaseApi from '../../apis/purchase.api'
import { formatNumberCurrency, generateNameId } from '../../utils/utils'
import { useEffect, useState } from 'react'
import { Purchase } from '../../types/purchase.type'
import { produce } from 'immer'
interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}

const Cart = () => {
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>([])
  const { data: purchasesData } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.cartIn }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.cartIn })
  })

  const purchasesInCart = purchasesData?.data.data
  const isAllChecked = extendedPurchase.every((purchase) => purchase.checked)
  useEffect(() => {
    setExtendedPurchase(
      purchasesInCart?.map((purchase) => ({
        ...purchase,
        disabled: false,
        checked: false
      })) || []
    )
  }, [purchasesInCart])

  const handleCheck = (productIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchase(
      produce((draf) => {
        draf[productIndex].checked = e.target.checked
      })
    )
  }
  const handleCheckAll = () => {
    setExtendedPurchase((prevState) =>
      prevState.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='wrap-content'>
        {extendedPurchase ? (
          <Fragment>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={isAllChecked}
                          onChange={handleCheckAll}
                        />
                      </div>
                      <div className='flex-grow text-black'>Sản phẩm</div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center'>
                      <div className='col-span-2'>Đơn giá</div>
                      <div className='col-span-1'>Số lượng</div>
                      <div className='col-span-1'>Số tiền</div>
                      <div className='col-span-1'>Thao tác</div>
                    </div>
                  </div>
                </div>
                <div className='my-3 rounded-sm bg-white p-5 shadow'>
                  {extendedPurchase.map((purchase, index) => (
                    <div
                      key={purchase._id}
                      className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
                    >
                      <div className='col-span-6'>
                        <div className='flex'>
                          <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                            <input
                              type='checkbox'
                              className='h-5 w-5'
                              checked={purchase.checked}
                              onChange={handleCheck(index)}
                            />
                          </div>
                          <div className='flex-grow'>
                            <div className='flex'>
                              <Link
                                className='h-20 w-20 flex-shrink-0'
                                to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                              >
                                <img src={purchase.product.image} alt={purchase.product.name} />
                              </Link>
                              <div className='flex-grow px-2 pt-1 pb-2'>
                                <Link
                                  to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                                  className='text-left line-clamp-2'
                                >
                                  {purchase.product.name}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-6'>
                        <div className='grid grid-cols-5 items-center'>
                          <div className='col-span-2'>
                            <div className='flex items-center justify-center'>
                              <span className='text-gray-300 line-through'>
                                ₫{formatNumberCurrency(purchase.product.price_before_discount)}
                              </span>
                              <span className='ml-3 text-red-400'>₫{formatNumberCurrency(purchase.product.price)}</span>
                            </div>
                          </div>
                          <div className='col-span-1'>
                            <QuantityController
                              classNameWrap='flex items-center'
                              max={purchase.product.quantity}
                              value={purchase.buy_count}
                            />
                          </div>
                          <div className='col-span-1'>
                            <span className='text-red-400'>
                              ₫{formatNumberCurrency(purchase.product.price * purchase.buy_count)}
                            </span>
                          </div>
                          <div className='col-span-1'>
                            <button className='bg-none text-black transition-colors hover:text-orange'>Xóa</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input
                    type='checkbox'
                    className='h-5 w-5 accent-orange'
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                </div>
                <button className='mx-3 border-none bg-none'>Chọn tất cả ({extendedPurchase.length})</button>
                <button className='mx-3 border-none bg-none'>Xóa</button>
              </div>

              <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                <div>
                  <div className='flex items-center sm:justify-end'>
                    <div>Tổng thanh toán (1000 sản phẩm):</div>
                    <div className='ml-2 text-2xl text-orange'>₫9999</div>
                  </div>
                  <div className='flex items-center text-sm sm:justify-end'>
                    <div className='text-gray-500'>Tiết kiệm</div>
                    <div className='ml-6 text-orange'>₫ 10000000</div>
                  </div>
                </div>
                <button className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'>
                  Mua hàng
                </button>
              </div>
            </div>
          </Fragment>
        ) : (
          <div className='text-center'>
            <img src='' alt='no purchase' className='mx-auto h-24 w-24' />
            <div className='mt-5 font-bold text-gray-400'>Giỏ hàng của bạn còn trống</div>
            <div className='mt-5 text-center'>
              <Link
                to={path.home}
                className=' rounded-sm bg-orange px-10 py-2  uppercase text-white transition-all hover:bg-orange/80'
              >
                Mua ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
