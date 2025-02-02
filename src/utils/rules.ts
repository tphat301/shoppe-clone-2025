import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}
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
    .oneOf([yup.ref('password')], 'Xác nhận mật khẩu không khớp')
})
export type Schema = yup.InferType<typeof schema>
export const loginSchema = schema.omit(['confirm_password'])
export type LoginSchema = yup.InferType<typeof loginSchema>
export default getRules
