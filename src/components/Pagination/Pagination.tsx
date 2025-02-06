import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import { QueryConfig } from '../../pages/ProductList/ProductList'
import { path } from '../../constants/path'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 2

const Pagination = ({ queryConfig, pageSize }: Props) => {
  const page = Number(queryConfig.page)
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='p-1.5 bg-transparent hover:cursor-not-allowed'>
            ...
          </span>
        )
      }
      return null
    }

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='p-1.5 bg-transparent hover:cursor-not-allowed'>
            ...
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && pageNumber < pageSize - RANGE + 1) {
          if (pageNumber > RANGE && pageNumber < page - RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < pageSize - RANGE) {
          return renderDotBefore(index)
        }

        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames(
              'p-1.5  shadow hover:cursor-pointer hover:bg-[#ee4d2d] hover:text-white duration-100',
              {
                'bg-[#ee4d2d] text-white': page === pageNumber,
                'bg-white': page !== pageNumber
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='mt-3 flex flex-wrap gap-2 justify-center'>
      <Link
        to={{
          pathname: path.home,
          search: createSearchParams({
            ...queryConfig,
            page: '1'
          }).toString()
        }}
        className='p-1.5 bg-white shadow hover:cursor-pointer hover:bg-[#ee4d2d] hover:text-white duration-100 flex items-center justify-center'
      >
        Frist
      </Link>
      {page > 1 && (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='p-1.5 bg-white shadow hover:cursor-pointer hover:bg-[#ee4d2d] hover:text-white duration-100 flex items-center justify-center'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='size-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
          </svg>
        </Link>
      )}

      {renderPagination()}
      {page < pageSize && (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='p-1.5 bg-white shadow hover:cursor-pointer hover:bg-[#ee4d2d] hover:text-white duration-100 flex items-center justify-center'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='size-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
          </svg>
        </Link>
      )}
      <Link
        to={{
          pathname: path.home,
          search: createSearchParams({
            ...queryConfig,
            page: Number(pageSize).toString()
          }).toString()
        }}
        className='p-1.5 bg-white shadow hover:cursor-pointer hover:bg-[#ee4d2d] hover:text-white duration-100 flex items-center justify-center'
      >
        Last
      </Link>
    </div>
  )
}

export default Pagination
