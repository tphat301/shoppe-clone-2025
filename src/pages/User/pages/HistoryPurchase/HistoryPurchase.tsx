import { createSearchParams, Link } from 'react-router-dom'
import { path } from '../../../../constants/path'
import { purchaseStatus } from '../../../../constants/purchase'
import classNames from 'classnames'
import { useQueryParams } from '../../../../hooks/useQueryParams'
import { useQuery } from '@tanstack/react-query'
import purchaseApi from '../../../../apis/purchase.api'
import { PurchaseListStatus } from '../../../../types/purchase.type'
import { formatNumberCurrency, generateNameId } from '../../../../utils/utils'

const purchaseTabs = [
  { status: purchaseStatus.cartAll, name: 'Tất Cả' },
  { status: purchaseStatus.cartForWaiting, name: 'Chờ Xác Nhận' },
  { status: purchaseStatus.cartForGetting, name: 'Chờ Lấy Hàng' },
  { status: purchaseStatus.cartForTransport, name: 'Đang Giao' },
  { status: purchaseStatus.cartForDelivered, name: 'Đã Giao' },
  { status: purchaseStatus.cartForCanceled, name: 'Đã Hủy' }
]

const HistoryPurchase = () => {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchaseStatus.cartAll
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus })
  })
  const purchasesInCart = purchasesInCartData?.data.data
  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>
            {purchaseTabs.map((item) => (
              <Link
                key={item.status}
                to={{
                  pathname: path.historyPurchase,
                  search: createSearchParams({
                    status: String(item.status)
                  }).toString()
                }}
                className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
                  'border-b-red-500 text-red-500': status === item.status,
                  'border-b-gray-500/100 text-gray-500': status !== item.status
                })}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div>
            {purchasesInCart?.map((purchase) => (
              <div key={purchase._id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
                <Link
                  to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                  className='flex'
                >
                  <div className='shrink-0'>
                    <img src={purchase.product.image} className='w-20 h-20 object-cover' alt={purchase.product.name} />
                  </div>
                  <div className='ml-3 grow overflow-hidden'>
                    <div className='truncate'>{purchase.product.name}</div>
                    <div className='mt-3'>x{purchase.buy_count}</div>
                  </div>
                  <div className='ml-3 flex flex-col justify-center items-center shrink-0'>
                    <span className='truncate text-red-500'>₫{formatNumberCurrency(purchase.product.price)}</span>
                    <span className='truncate text-xs text-gray-500 line-through'>
                      ₫{formatNumberCurrency(purchase.product.price_before_discount)}
                    </span>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div>
                    <span>Tổng giá tiền:</span>
                    <span className='ml-4 text-xl text-red-500'>
                      ₫{formatNumberCurrency(purchase.product.price * purchase.buy_count)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryPurchase
