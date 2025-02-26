import { Fragment } from 'react/jsx-runtime'
import Input from '../../../../components/Input'
import InputNumber from '../../../../components/InputNumber'
import { Controller, useFormContext } from 'react-hook-form'
import { ProfileSchema } from '../../../../utils/rules'

const InputInfo = () => {
  const {
    register,
    formState: { errors },
    control
  } = useFormContext<ProfileSchema>()
  return (
    <Fragment>
      <div className='mt-2 md:mt-6 flex flex-wrap'>
        <div className='w-full md:w-[20%] truncate pt-3 text-start md:text-right capitalize'>Họ Tên</div>
        <div className='pl-0 w-full md:w-[80%] md:pl-5'>
          <Input
            name='name'
            classNameInput='bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full px-3 py-2 outline-0'
            className='ssm:mb-0 lg:mb-0 ssm:min-h-[auto]'
            placeholder='Họ Tên'
            register={register}
            errorMessage={errors.name?.message}
          />
        </div>
      </div>
      <div className='mt-2 md:mt-4 flex flex-wrap'>
        <div className='w-full md:w-[20%] truncate pt-3 text-start md:text-right capitalize'>Số điện thoại</div>
        <div className='pl-0 w-full md:w-[80%] md:pl-5'>
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <InputNumber
                className='grow'
                type='text'
                placeholder='Số điện thoại'
                onChange={field.onChange}
                value={field.value}
                ref={field.ref}
                classNameInput='bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full px-3 py-2 outline-0'
                errorMessage={errors.phone?.message}
              />
            )}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default InputInfo
