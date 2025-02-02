import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='bg-[rgb(238,77,45)]'>
      <div className='wrap-content lg:py-20 ssm:py-10'>
        <div className='lg:flex lg:items-center lg:max-w-[1040px] ssm:max-w-[1200px] lg:h-[600px] ssm:h-full lg:bg-[url("https://down-vn.img.susercontent.com/file/sg-11134004-7ra0r-m4re2su1gpxufa")] lg:bg-contain lg:bg-no-repeat lg:bg-center'>
          <form className='bg-white lg:p-8 ssm:py-6 ssm:px-4 rounded-[4px] lg:w-[40%] ml-auto'>
            <h2 className='ssm:text-xl lg:text-2xl text-[#222] lg:mb-6 ssm:mb-3 lg:text-left ssm:text-center capitalize'>
              Đăng nhập
            </h2>
            <div className='ssm:mb-3 lg:mb-5'>
              <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>
                Email
              </label>
              <input
                type='email'
                name='email'
                className='bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full p-2.5 outline-0'
                placeholder='Email'
                required
              />
            </div>
            <div className='ssm:mb-3 lg:mb-5'>
              <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>
                Mật khẩu
              </label>
              <input
                type='password'
                name='password'
                className='bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full p-2.5 outline-0'
                placeholder='Mật khẩu'
                required
              />
            </div>
            <button className='text-white bg-[#ee4d2d] hover:bg-[#ee4d2d] focus:ring-4 focus:ring-[#ee4d2d78] font-medium text-sm px-5 py-2.5 me-2 mb-3 focus:outline-none w-full uppercase'>
              Đăng Nhập
            </button>
            <p className='text-[rgba(0,0,0,.54)]'>
              <span>Bạn đã có tài khoản? </span>
              <Link to='/register' className='text-[#ee4d2d]'>
                Đăng ký
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
