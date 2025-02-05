import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { omit } from 'lodash'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { Schema, schema } from '../../utils/rules'
import Input from '../../components/Input'
import DescriptionForm from '../../components/DescriptionForm/DescriptionForm'
import { path } from '../../constants/path'
import authApi from '../../apis/auth.api'
import { isAxiosUnprocessableEntity } from '../../utils/utils'
import { ErrorResponseApi } from '../../types/utils.type'
import { AppContext } from '../../contexts/app.context'
import Button from '../../components/Button'

type FormData = Schema
type TypeBody = Omit<FormData, 'confirm_password'>
type TypeIsAxiosUnprocessableEntity = ErrorResponseApi<TypeBody>

const Register = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(schema) })
  const registerMutation = useMutation({
    mutationFn: (body: TypeBody) => authApi.register(body)
  })
  const handleSubmitForm = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate(path.home)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<TypeIsAxiosUnprocessableEntity>(error)) {
          const formError = error.response?.data?.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof TypeBody, {
                message: formError[key as keyof TypeBody],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
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
            <Input
              name='email'
              type='email'
              label='Email'
              placeholder='Email'
              register={register}
              errorMessage={errors?.email?.message as string}
            />
            <Input
              name='password'
              type='password'
              label='Mật khẩu'
              placeholder='Mật khẩu'
              register={register}
              errorMessage={errors?.password?.message as string}
              autoComplete='on'
            />
            <Input
              name='confirm_password'
              type='password'
              label='Xác nhận mật khẩu'
              placeholder='Xác nhận mật khẩu'
              register={register}
              errorMessage={errors?.confirm_password?.message as string}
              autoComplete='on'
            />
            <Button isLoading={registerMutation.isPending} disabled={registerMutation.isPending}>
              Đăng Ký
            </Button>
            <DescriptionForm title='Đăng nhập' href={path.login} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
