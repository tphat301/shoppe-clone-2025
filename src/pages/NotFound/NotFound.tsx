import { Link } from 'react-router-dom'
import { path } from '../../constants/path'

const NotFound = () => {
  return (
    <div className='wrap-content'>
      <div className='lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16'>
        <div className='xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0'>
          <div className='relative'>
            <div>
              <img src='https://i.ibb.co/G9DC8S0/404-2.png' />
            </div>
            <div>
              <h1 className='my-2 text-gray-800 font-bold text-2xl'>Không tìm thấy kết quả</h1>
              <Link
                to={path.home}
                className='sm:w-full w-fit my-2 border rounded md py-4 px-8 text-center bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50 flex'
              >
                Quay lại trang chủ
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img src='https://i.ibb.co/ck1SGFJ/Group.png' />
        </div>
      </div>
    </div>
  )
}

export default NotFound
