import classNames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { path } from '../../../constants/path'
import Button from '../../../components/Button'
import { Category } from '../../../types/category.type'
import { QueryConfig } from '../../../hooks/useQueryConfig'
import InputNumber from '../../../components/InputNumber'
import { PriceSchema, priceSchema } from '../../../utils/rules'

interface Props {
  categories: Category[]
  queryConfig: QueryConfig
}
const AsideFilter = ({ categories, queryConfig }: Props) => {
  const { category } = queryConfig
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<PriceSchema>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })
  return (
    <div className='sticky top-[10px]'>
      <Link
        to={path.home}
        className={classNames('capitalize py-2 flex text-base font-bold', {
          'text-[#fb5533]': !category
        })}
        title='Tất cả danh mục'
      >
        Tất cả danh mục
      </Link>
      <div className='bg-gray-300 h-[1px] w-full' />
      <ul>
        {categories.map((categoryItem) => (
          <li className='py-2' key={categoryItem._id}>
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  category: categoryItem._id
                }).toString()
              }}
              className={classNames('capitalize px-2 font-semibol', {
                'text-[#fb5533]': category === categoryItem._id
              })}
              title={categoryItem.name}
            >
              {categoryItem.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className='bg-gray-300 h-[1px] w-full' />
      <div className='font-bold mt-3'>Khoảng giá:</div>
      <form className='mt-2' onSubmit={onSubmit}>
        <div className='flex items-start mb-2'>
          <Controller
            control={control}
            name='price_min'
            render={({ field }) => {
              return (
                <InputNumber
                  className='grow'
                  type='text'
                  placeholder='đ TỪ'
                  onChange={(e) => {
                    field.onChange(e)
                    trigger('price_max')
                  }}
                  value={field.value}
                  ref={field.ref}
                  classNameInput='bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full p-1 outline-0'
                />
              )
            }}
          />

          <div className='mx-2 shrink-0'>-</div>
          <Controller
            control={control}
            name='price_max'
            render={({ field }) => {
              return (
                <InputNumber
                  className='grow'
                  type='text'
                  placeholder='đ ĐẾN'
                  onChange={(e) => {
                    field.onChange(e)
                    trigger('price_min')
                  }}
                  value={field.value}
                  ref={field.ref}
                  classNameInput='bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full p-1 outline-0'
                />
              )
            }}
          />
        </div>
        {errors && (
          <span className='text-red-600 text-center block mb-1'>
            {errors.price_max?.message || errors.price_min?.message}
          </span>
        )}
        <Button>Áp dụng</Button>
      </form>
      <div className='bg-gray-300 h-[1px] w-full' />
      <div className='font-bold mt-3'>Đánh giá:</div>
      <ul>
        <li className='py-4'>
          <Link to='' className='flex items-center' title='Star'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg
                  key={index}
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='size-5 fill-[#ffb720]'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                    clipRule='evenodd'
                  />
                </svg>
              ))}
            <span className='ml-2'>trở lên</span>
          </Link>
        </li>
      </ul>
      <div className='bg-gray-300 h-[1px] w-full mb-3' />
      <Button>Xóa tất cả</Button>
    </div>
  )
}

export default AsideFilter
