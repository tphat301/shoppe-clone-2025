import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import rules from '../../utils/rules'
import type { RegisterOptions } from 'react-hook-form'
type FormData = {
  email: string
  password: string
  confirm_password: string
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  const handleSubmitForm = handleSubmit((data) => {
    // console.log(data)
  })
  console.log(errors)
  return (
    <div className='bg-[rgb(238,77,45)]'>
      <div className='wrap-content lg:py-20 ssm:py-10'>
        <div className='lg:flex lg:items-center lg:max-w-[1040px] ssm:max-w-[1200px] lg:h-[600px] ssm:h-full lg:bg-[url("https://down-vn.img.susercontent.com/file/sg-11134004-7ra0r-m4re2su1gpxufa")] lg:bg-contain lg:bg-no-repeat lg:bg-center'>
          <form
            className='bg-white lg:p-8 ssm:py-6 ssm:px-4 rounded-[4px] lg:w-[40%] ml-auto'
            onSubmit={handleSubmitForm}
          >
            <h2 className='ssm:text-xl lg:text-2xl text-[#222] lg:mb-6 ssm:mb-3 lg:text-left ssm:text-center capitalize'>
              Đăng ký tài khoản
            </h2>
            <div className='ssm:mb-0 lg:mb-1 ssm:min-h-[91px]'>
              <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>
                Email
              </label>
              <input
                type='text'
                className='bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full p-2.5 outline-0'
                placeholder='Email'
                {...register('email', rules.email as { [key: string]: RegisterOptions })}
              />
              {errors?.email?.message && <span className='text-red-600'>{errors?.email?.message}</span>}
            </div>
            <div className='ssm:mb-0 lg:mb-1 ssm:min-h-[91px]'>
              <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>
                Mật khẩu
              </label>
              <input
                type='password'
                className='bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full p-2.5 outline-0'
                placeholder='Mật khẩu'
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Mật khẩu là bắt buộc'
                  }
                })}
              />
              {errors?.password?.message && <span className='text-red-600'>{errors?.password?.message}</span>}
            </div>
            <div className='ssm:mb-0 lg:mb-1 ssm:min-h-[91px]'>
              <label htmlFor='confirm_password' className='block mb-2 text-sm font-medium text-gray-900'>
                Xác nhận mật khẩu
              </label>
              <input
                type='password'
                className='bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full p-2.5 outline-0'
                placeholder='Xác nhận mật khẩu'
                {...register('confirm_password', {
                  required: {
                    value: true,
                    message: 'Xác nhận mật khẩu là bắt buộc'
                  }
                })}
              />
              {errors?.confirm_password?.message && (
                <span className='text-red-600'>{errors?.confirm_password?.message}</span>
              )}
            </div>
            <button className='text-white bg-[#ee4d2d] hover:bg-[#ee4d2d] focus:ring-4 focus:ring-[#ee4d2d78] font-medium text-sm px-5 py-2.5 me-2 mb-3 focus:outline-none w-full uppercase ssm:mt-1 lg:mt-0'>
              Đăng Ký
            </button>
            <p className='text-[rgba(0,0,0,.54)]'>
              <span>Bạn đã có tài khoản? </span>
              <Link to='/login' className='text-[#ee4d2d]'>
                Đăng nhập
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
