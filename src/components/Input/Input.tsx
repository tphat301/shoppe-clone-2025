import { type InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errorMessage?: string
  classNameInput?: string
  classNameErrorMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

const Input = ({
  className = 'ssm:mb-0 lg:mb-1 ssm:min-h-[91px]',
  classNameInput = 'bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full p-2.5 outline-0',
  type,
  label,
  name,
  classNameErrorMessage = 'text-red-600',
  errorMessage,
  register,
  rules,
  ...rest
}: Props) => {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className='block mb-2 text-sm font-medium text-gray-900'>
          {label}
        </label>
      )}
      <input type={type} className={classNameInput} {...registerResult} {...rest} />
      {errorMessage && <span className={classNameErrorMessage}>{errorMessage}</span>}
    </div>
  )
}

export default Input
