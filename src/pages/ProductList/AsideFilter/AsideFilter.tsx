import { Link } from 'react-router-dom'
import { path } from '../../../constants/path'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

const AsideFilter = () => {
  return (
    <div className='py-4'>
      <Link to={path.home} className='capitalize py-2 flex text-base font-bold' title='Tất cả danh mục'>
        Tất cả danh mục
      </Link>
      <div className='bg-gray-300 h-[1px] w-full' />
      <ul>
        <li className='py-2'>
          <Link to={path.home} className='capitalize text-[#fb5533] px-2 font-semibold'>
            Thời trang nam
          </Link>
        </li>
        <li className='py-2'>
          <Link to={path.home} className='capitalize px-2 font-semibold'>
            Thời trang nữ
          </Link>
        </li>
      </ul>
      <div className='bg-gray-300 h-[1px] w-full' />
      <div className='font-bold mt-3'>Khoảng giá:</div>
      <form className='mt-2'>
        <div className='flex items-start mb-6'>
          <Input
            className='grow'
            type='text'
            name='from'
            placeholder='đ TỪ'
            classNameInput='bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full p-1 outline-0'
          />
          <div className='mx-2 shrink-0'>-</div>
          <Input
            className='grow'
            type='text'
            name='to'
            placeholder='đ ĐẾN'
            classNameInput='bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full p-1 outline-0'
          />
        </div>
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
