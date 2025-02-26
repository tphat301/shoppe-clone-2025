import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import useApi from '../../../../apis/user.api'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import { isAxiosUnprocessableEntity } from '../../../../utils/utils'
import { ErrorResponseApi } from '../../../../types/utils.type'
import { changePasswordSchema, ChangePasswordSchema } from '../../../../utils/rules'

type Body = Omit<ChangePasswordSchema, 'confirm_password'>
const ChangePassword = () => {
  const {
    register,
    formState: { errors },
    reset,
    setError,
    handleSubmit
  } = useForm<ChangePasswordSchema>({
    defaultValues: {
      password: '',
      confirm_password: '',
      new_password: ''
    },
    resolver: yupResolver(changePasswordSchema)
  })
  const updateProfileMutation = useMutation({
    mutationFn: useApi.updateProfile
  })

  const handleSubmitForm = handleSubmit(async (data: Body) => {
    try {
      const res = await updateProfileMutation.mutateAsync(data)
      toast.success(res.data.message, { autoClose: 1000 })
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntity<ErrorResponseApi<ChangePasswordSchema>>(error)) {
        const formError = error.response?.data?.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof ChangePasswordSchema, {
              message: formError[key as keyof ChangePasswordSchema],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return (
    <div className='rounded-sm bg-white px-2 md:px-7 pb-10 md:pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg capitalize text-gray-900 font-normal'>Đổi Mật Khẩu</h1>
        <span className='mt-1 block text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={handleSubmitForm}>
        <div className='mt-6 grow pr-0 md:pr-12 md:mt-0'>
          <div className='mt-2 md:mt-4 flex flex-wrap'>
            <div className='w-full md:w-[20%] truncate pt-3 text-start md:text-right capitalize'>Mật khẩu</div>
            <div className='pl-0 w-full md:w-[80%] md:pl-5'>
              <Input
                name='password'
                type='password'
                classNameInput='bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full px-3 py-2 outline-0'
                className='ssm:mb-0 lg:mb-0 ssm:min-h-[auto]'
                placeholder='Mật khẩu'
                register={register}
                errorMessage={errors.password?.message}
              />
            </div>
          </div>
          <div className='mt-2 md:mt-4 flex flex-wrap'>
            <div className='w-full md:w-[20%] truncate pt-3 text-start md:text-right capitalize'>Mật khẩu mới</div>
            <div className='pl-0 w-full md:w-[80%] md:pl-5'>
              <Input
                name='new_password'
                type='password'
                classNameInput='bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full px-3 py-2 outline-0'
                className='ssm:mb-0 lg:mb-0 ssm:min-h-[auto]'
                placeholder='Mật khẩu mới'
                register={register}
                errorMessage={errors.new_password?.message}
              />
            </div>
          </div>
          <div className='mt-2 md:mt-4 flex flex-wrap'>
            <div className='w-full md:w-[20%] truncate pt-3 text-start md:text-right capitalize'>
              Xác nhận mật khẩu mới
            </div>
            <div className='pl-0 w-full md:w-[80%] md:pl-5'>
              <Input
                name='confirm_password'
                type='password'
                classNameInput='bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full px-3 py-2 outline-0'
                className='ssm:mb-0 lg:mb-0 ssm:min-h-[auto]'
                placeholder='Xác nhận mật khẩu mới'
                register={register}
                errorMessage={errors.confirm_password?.message}
              />
            </div>
          </div>
          <div className='mt-2 md:mt-4 flex flex-wrap'>
            <div className='w-full md:w-[20%] truncate pt-3 text-start md:text-right capitalize' />
            <div className='pl-0 w-full md:w-[80%] md:pl-5'>
              <Button
                type='submit'
                className='flex h-9 items-center bg-red-500 px-5 text-center text-sm text-white hover:bg-red-500/80 hover:cursor-pointer'
                isLoading={updateProfileMutation.isPending}
                disabled={updateProfileMutation.isPending}
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
