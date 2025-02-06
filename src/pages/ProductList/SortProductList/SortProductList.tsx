import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { omit } from 'lodash'
import { path } from '../../../constants/path'
import { QueryConfig } from '../ProductList'
import { ProductListConfig } from '../../../types/product.type'
import { Order, SortBy } from '../../../constants/product'
interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
const SortProductList = ({ queryConfig, pageSize }: Props) => {
  const page = Number(queryConfig.page)
  const { sort_by = SortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => sort_by === sortByValue
  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handleSortPrice = (sortPriceValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: SortBy.price,
        order: sortPriceValue
      }).toString()
    })
  }
  return (
    <div className='py-4 px-3 bg-gray-300/40'>
      <div className='flex flex-wrap justify-between items-center gap-2'>
        <div className='flex justify-between items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames('h-8 px-4 hover:cursor-pointer capitalize', {
              'bg-[#ee4d2d] hover:bg-[#ee4d2dd2] text-white': isActiveSortBy(SortBy.view),
              'bg-white hover:bg-slate-100 text-black': !isActiveSortBy(SortBy.view)
            })}
            onClick={() => handleSort(SortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames('h-8 px-4 hover:cursor-pointer capitalize', {
              'bg-[#ee4d2d] hover:bg-[#ee4d2dd2] text-white': isActiveSortBy(SortBy.createdAt),
              'bg-white hover:bg-slate-100 text-black': !isActiveSortBy(SortBy.createdAt)
            })}
            onClick={() => handleSort(SortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-8 px-4 hover:cursor-pointer capitalize', {
              'bg-[#ee4d2d] hover:bg-[#ee4d2dd2] text-white': isActiveSortBy(SortBy.sold),
              'bg-white hover:bg-slate-100 text-black': !isActiveSortBy(SortBy.sold)
            })}
            onClick={() => handleSort(SortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames('h-8 px-2  hover:cursor-pointer text-black capitalize text-left outline-0 text-sm', {
              'bg-[#ee4d2d] hover:bg-[#ee4d2dd2] text-white': isActiveSortBy(SortBy.price),
              'bg-white hover:bg-slate-100 text-black': !isActiveSortBy(SortBy.price)
            })}
            value={order || ''}
            onChange={(event) => handleSortPrice(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled className='bg-white text-black'>
              Giá
            </option>
            <option value={Order.asc} className='bg-white text-black'>
              Giá từ thấp đến cao
            </option>
            <option value={Order.desc} className='bg-white text-black'>
              Giá từ cao đến thâp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-[#ee4d2d]'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex flex-wrap'>
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (page - 1).toString()
                }).toString()
              }}
              className={classNames(
                'px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100 shadow flex items-center justify-center',
                {
                  'pointer-events-none bg-white/60': page === 1
                }
              )}
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
            </Link>
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (page + 1).toString()
                }).toString()
              }}
              className={classNames(
                'px-3 h-8 rounded-tr-sm rounded-br-sm bg-white hover:bg-slate-100 shadow flex items-center justify-center',
                {
                  'pointer-events-none bg-white/60': page === pageSize
                }
              )}
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductList
