import { useMutation, useQuery } from '@tanstack/react-query'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import useApi from '../../../../apis/user.api'
import { useForm, Controller, FormProvider } from 'react-hook-form'
import { profileSchema, ProfileSchema } from '../../../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect, useMemo, useState } from 'react'
import DateSelect from '../../components/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from '../../../../contexts/app.context'
import { setProfileToLS } from '../../../../utils/auth'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from '../../../../utils/utils'
import InputFile from '../../../../components/InputFile'
import InputInfo from '../../components/InputInfo'
import { ErrorResponseApi } from '../../../../types/utils.type'

type FormDataError = Omit<ProfileSchema, 'date_of_birth'> & {
  date_of_birth?: string
}

const Profile = () => {
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const methods = useForm<ProfileSchema>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1),
      avatar: ''
    },
    resolver: yupResolver(profileSchema)
  })
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    setError,
    formState: { errors }
  } = methods
  const avatar = watch('avatar')
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: useApi.getProfile
  })
  const profile = profileData?.data.data
  const updateProfileMutation = useMutation({
    mutationFn: useApi.updateProfile
  })
  const uploadAvatarMutation = useMutation({
    mutationFn: useApi.uploadAvatar
  })
  useEffect(() => {
    setValue('name', profile?.name)
    setValue('address', profile?.address)
    setValue('avatar', profile?.avatar)
    setValue('phone', profile?.phone)
    setValue('date_of_birth', profile?.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
  }, [profile, setValue])

  const handleSubmitForm = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      refetch()
      setProfile(res.data.data)
      setProfileToLS(res.data.data)
      toast.success(res.data.message, { autoClose: 1000 })
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormDataError>>(error)) {
        const formError = error.response?.data?.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  return (
    <div className='rounded-sm bg-white px-2 md:px-7 pb-10 md:pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg capitalize text-gray-900 font-normal'>Hồ Sơ Của Tôi</h1>
        <span className='mt-1 block text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
      </div>
      <FormProvider {...methods}>
        <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={handleSubmitForm}>
          <div className='mt-6 grow pr-0 md:pr-12 md:mt-0'>
            <div className='flex flex-wrap'>
              <div className='w-full md:w-[20%] truncate pt-3 text-start md:text-right capitalize'>Email</div>
              <div className='pl-0 w-full md:w-[80%] md:pl-5'>
                <div className='pt-3 text-gray-700'>{profile?.email}</div>
              </div>
            </div>
            <InputInfo />
            <div className='mt-2 md:mt-4 flex flex-wrap'>
              <div className='w-full md:w-[20%] truncate pt-3 text-start md:text-right capitalize'>Địa chỉ</div>
              <div className='pl-0 w-full md:w-[80%] md:pl-5'>
                <Input
                  name='address'
                  classNameInput='bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full px-3 py-2 outline-0'
                  className='ssm:mb-0 lg:mb-0 ssm:min-h-[auto]'
                  placeholder='Địa chỉ'
                  register={register}
                  errorMessage={errors.address?.message}
                />
              </div>
            </div>
            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <DateSelect
                  onChange={field.onChange}
                  value={field.value}
                  errorMessage={errors.date_of_birth?.message}
                />
              )}
            />

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
          <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
            <div className='flex flex-col items-center'>
              <div className='my-5 h-24 w-24'>
                <img
                  src={previewImage || getAvatarUrl(avatar)}
                  className='w-full h-full object-cover rounded-full'
                  alt=''
                />
              </div>
              <InputFile onChange={handleChangeFile} />
              <div className='mt-3 text-gray-400'>Dung lượng tối đa 1 MB</div>
              <div className='mt-1 text-gray-400'>Định dạng: .JPG, .JPEG, .PNG</div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default Profile
