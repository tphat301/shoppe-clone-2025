import { Fragment, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import DescriptionForm from '../../components/DescriptionForm/DescriptionForm'
import Input from '../../components/Input'
import { path } from '../../constants/path'
import authApi from '../../apis/auth.api'
import { LoginSchema, loginSchema } from '../../utils/rules'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { ErrorResponseApi } from '../../types/utils.type'
import { AppContext } from '../../contexts/app.context'
import Button from '../../components/Button'
import { Helmet } from 'react-helmet-async'

type FormData = LoginSchema
type TypeIsAxiosUnprocessableEntity = ErrorResponseApi<FormData>
const Login = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) })
  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  })
  const handleSubmitForm = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate(path.home)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<TypeIsAxiosUnprocessableEntity>(error)) {
          const formError = error.response?.data?.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  return (
    <Fragment>
      <Helmet>
        <title>Login - Shoppe</title>
        <meta name='description' content='This is a page login' />
      </Helmet>
      <div className='bg-[rgb(238,77,45)]'>
        <div className='wrap-content lg:py-20 ssm:py-10'>
          <div className='lg:flex lg:items-center lg:max-w-[1040px] ssm:max-w-[1200px] lg:h-[600px] ssm:h-full lg:bg-[url("https://down-vn.img.susercontent.com/file/sg-11134004-7ra0r-m4re2su1gpxufa")] lg:bg-contain lg:bg-no-repeat lg:bg-center'>
            <form
              className='bg-white lg:p-8 ssm:py-6 ssm:px-4 rounded-[4px] lg:w-[40%] ml-auto'
              onSubmit={handleSubmitForm}
            >
              <h2 className='ssm:text-xl lg:text-2xl text-[#222] lg:mb-6 ssm:mb-3 lg:text-left ssm:text-center capitalize'>
                Đăng nhập
              </h2>
              <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>
                Email
              </label>
              <Input
                name='email'
                type='email'
                placeholder='Email'
                register={register}
                errorMessage={errors?.email?.message as string}
              />
              <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>
                Mật khẩu
              </label>
              <Input
                name='password'
                type='password'
                placeholder='Mật khẩu'
                register={register}
                errorMessage={errors?.password?.message as string}
                autoComplete='on'
                className='ssm:mb-0 lg:mb-1 ssm:min-h-[63px] relative'
              />
              <Button isLoading={loginMutation.isPending} disabled={loginMutation.isPending}>
                Đăng Nhập
              </Button>
              <DescriptionForm title='Đăng ký' href={path.register} />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Login
