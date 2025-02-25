import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
import { NoUndefinedField } from '../types/utils.type'

type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    },
    minLength: {
      value: 5,
      message: 'Email phải nhập tối thiểu 5 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Email chỉ cho phép nhập tối đa 160 ký tự'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email chưa đúng định dạng'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Mật khẩu là bắt buộc'
    },
    minLength: {
      value: 5,
      message: 'Mật khẩu phải nhập tối thiểu 5 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Mật khẩu chỉ cho phép nhập tối đa 160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Xác nhận mật khẩu là bắt buộc'
    },
    minLength: {
      value: 5,
      message: 'Xác nhận mật khẩu phải nhập tối thiểu 5 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Xác nhận mật khẩu chỉ cho phép nhập tối đa 160 ký tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Xác nhận mật khẩu không khớp'
        : undefined
  }
})

function testPrice(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .min(5, 'Email phải nhập tối thiểu 5 ký tự')
    .max(160, 'Email chỉ cho phép nhập tối đa 160 ký tự')
    .email('Email chưa đúng định dạng'),
  password: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .min(6, 'Mật khẩu phải nhập tối thiểu 6 ký tự')
    .max(160, 'Mật khẩu chỉ cho phép nhập tối đa 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Xác nhận mật khẩu là bắt buộc')
    .min(6, 'Xác nhận mật khẩu phải nhập tối thiểu 6 ký tự')
    .max(160, 'Xác nhận mật khẩu chỉ cho phép nhập tối đa 160 ký tự')
    .oneOf([yup.ref('password')], 'Xác nhận mật khẩu không khớp'),
  price_min: yup.string().default('').test({
    name: 'price-not-allow',
    message: 'Giá không phù hợp',
    test: testPrice
  }),
  price_max: yup.string().default('').test({
    name: 'price-not-allow',
    message: 'Giá không phù hợp',
    test: testPrice
  }),
  name: yup.string().trim().required()
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa 160 ký tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa 1000 ký tự'),
  phone: yup.string().max(20, 'Độ dài tối đa 20 ký tự'),
  address: yup.string().max(160, 'Độ dài tối đa 160 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: schema.fields['confirm_password']
})

export type Schema = Omit<yup.InferType<typeof schema>, 'price_max' | 'price_min'>
export const loginSchema = schema.pick(['email', 'password'])
export type LoginSchema = Pick<yup.InferType<typeof loginSchema>, 'email' | 'password'>
export const priceSchema = schema.pick(['price_min', 'price_max'])
export type PriceSchema = NoUndefinedField<yup.InferType<typeof priceSchema>>
export const searchSchema = schema.pick(['name'])
export type SearchSchema = Pick<yup.InferType<typeof searchSchema>, 'name'>
export default getRules
export type UserSchema = yup.InferType<typeof userSchema>
