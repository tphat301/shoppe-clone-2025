import { Link, useLocation } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { useContext, useEffect, useMemo } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { path } from '../../constants/path'
import QuantityController from '../../components/QuantityController'
import { purchaseStatus } from '../../constants/purchase'
import purchaseApi from '../../apis/purchase.api'
import { formatNumberCurrency, generateNameId } from '../../utils/utils'
import { Purchase } from '../../types/purchase.type'
import Button from '../../components/Button'
import { toast } from 'react-toastify'
import { AppContext } from '../../contexts/app.context'

const Cart = () => {
  const { extendedPurchase, setExtendedPurchase } = useContext(AppContext)
  const { data: purchasesData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.cartIn }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.cartIn })
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const buyPurchaseMutation = useMutation({
    mutationFn: purchaseApi.buyPurchases,
    onSuccess: () => {
      refetch()
    }
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const location = useLocation()
  const choosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId
  const purchasesInCart = purchasesData?.data.data
  const isAllChecked = useMemo(() => extendedPurchase.every((purchase) => purchase.checked), [extendedPurchase])
  const purchasesChecked = useMemo(() => extendedPurchase.filter((purchase) => purchase.checked), [extendedPurchase])
  const purchaseCheckedCount = purchasesChecked.length
  const totalCheckedPurchasePrice = useMemo(
    () =>
      purchasesChecked.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [purchasesChecked]
  )
  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      purchasesChecked.reduce((result, current) => {
        return result + (current.product.price_before_discount - current.product.price) * current.buy_count
      }, 0),
    [purchasesChecked]
  )

  useEffect(() => {
    setExtendedPurchase((prevState) => {
      const extendedPurchasesObject = keyBy(prevState, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          const isChoosenPurchaseIdFromLocation = choosenPurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChoosenPurchaseIdFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchasesInCart, choosenPurchaseIdFromLocation, setExtendedPurchase])

  useEffect(() => {
    return () => {
      window.history.replaceState(null, '')
    }
  }, [])

  const handleCheck = (purchaseIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchase(
      produce((draf) => {
        draf[purchaseIndex].checked = e.target.checked
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

  const handleQuantityType = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchase(
      produce((draf) => {
        draf[purchaseIndex].buy_count = value
      })
    )
  }

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchase[purchaseIndex]
      setExtendedPurchase(
        produce((draf) => {
          draf[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleDeletePurchase = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchase[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId])
  }

  const handleDeleteAllPurchase = () => {
    const purchaseIds = purchasesChecked.map((purchase) => purchase._id)
    if (purchaseCheckedCount > 0) deletePurchaseMutation.mutate(purchaseIds)
  }

  const handleBuyPurchase = () => {
    if (purchaseCheckedCount > 0) {
      const body = purchasesChecked.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyPurchaseMutation.mutate(body, {
        onSuccess: (data) => {
          toast(data.data.message, { autoClose: 1000 })
        }
      })
    }
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='wrap-content'>
        {extendedPurchase.length > 0 ? (
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
                              onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                              onType={handleQuantityType(index)}
                              onFocusOut={(value) =>
                                handleQuantity(
                                  index,
                                  value,
                                  value >= 1 &&
                                    value <= purchase.product.quantity &&
                                    value !== (purchasesInCart as Purchase[])[index].buy_count
                                )
                              }
                              onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                              disabled={purchase.disabled}
                            />
                          </div>
                          <div className='col-span-1'>
                            <span className='text-red-400'>
                              ₫{formatNumberCurrency(purchase.product.price * purchase.buy_count)}
                            </span>
                          </div>
                          <div className='col-span-1'>
                            <button
                              className='bg-none text-red-500 transition-colors hover:text-red-400 hover:cursor-pointer'
                              onClick={handleDeletePurchase(index)}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='size-4'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                                />
                              </svg>
                            </button>
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
                <button className='mx-3 border-none bg-none hover:cursor-pointer' onClick={handleCheckAll}>
                  Chọn tất cả ({extendedPurchase.length})
                </button>
                <button
                  onClick={handleDeleteAllPurchase}
                  className='mx-3 border-none bg-none hover:text-red-400 hover:cursor-pointer'
                >
                  Xóa ({purchaseCheckedCount})
                </button>
              </div>

              <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                <div>
                  <div className='flex items-center sm:justify-end'>
                    <div>Tổng thanh toán ({purchaseCheckedCount} sản phẩm):</div>
                    <div className='ml-2 text-2xl text-red-400'>₫{formatNumberCurrency(totalCheckedPurchasePrice)}</div>
                  </div>
                  <div className='flex items-center text-sm sm:justify-end'>
                    <div className='text-gray-500'>Tiết kiệm</div>
                    <div className='ml-6 text-red-400'>₫{formatNumberCurrency(totalCheckedPurchaseSavingPrice)}</div>
                  </div>
                </div>
                <Button
                  onClick={handleBuyPurchase}
                  className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0 hover:cursor-pointer'
                  isLoading={buyPurchaseMutation.isPending}
                  disabled={buyPurchaseMutation.isPending}
                >
                  Mua hàng
                </Button>
              </div>
            </div>
          </Fragment>
        ) : (
          <div className='text-center'>
            <svg
              className='dark:text-neutral-200 mx-auto h-24 w-24'
              xmlns='http://www.w3.org/2000/svg'
              width={10}
              height={10}
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z' />
              <path d='M3 6h18' />
              <path d='M16 10a4 4 0 0 1-8 0' />
            </svg>
            <div className='mt-5 font-bold text-gray-400 capitalize'>Giỏ hàng trống</div>
            <div className='mt-5 text-center'>
              <Link
                to={path.home}
                className=' rounded-sm bg-orange px-10 py-2  capitalize text-red-400 transition-all hover:bg-orange/80'
              >
                Quay lại và tiếp tục mua hàng
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
