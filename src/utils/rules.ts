import type { RegisterOptions } from 'react-hook-form'
type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}
const rules: Rules = {
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
  }
}
export default rules
