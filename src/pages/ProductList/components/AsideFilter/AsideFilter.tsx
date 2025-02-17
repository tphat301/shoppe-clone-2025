import classNames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { path } from '../../../../constants/path'
import Button from '../../../../components/Button'
import { Category } from '../../../../types/category.type'
import { QueryConfig } from '../../../../hooks/useQueryConfig'
import InputNumber from '../../../../components/InputNumber'
import { PriceSchema, priceSchema } from '../../../../utils/rules'
import RatingFilter from '../RatingFilter'
import { omit } from 'lodash'

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

  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'category', 'rating_filter'])).toString()
    })
  }
  return (
    <div className='sticky top-[110px]'>
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
      <RatingFilter queryConfig={queryConfig} />
      <div className='bg-gray-300 h-[1px] w-full my-3' />
      <Button onClick={handleRemoveAll}>Xóa tất cả</Button>
    </div>
  )
}

export default AsideFilter
