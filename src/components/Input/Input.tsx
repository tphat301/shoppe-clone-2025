import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props {
  className?: string
  type: React.HTMLInputTypeAttribute
  label?: string
  name: string
  placeholder?: string
  errorMessage: string
  classNameErrorMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: string
}

const Input = ({
  className,
  type,
  label,
  name,
  classNameErrorMessage,
  placeholder,
  errorMessage,
  register,
  rules,
  autoComplete
}: Props) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className='block mb-2 text-sm font-medium text-gray-900'>
          {label}
        </label>
      )}
      <input
        type={type}
        className='bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full p-2.5 outline-0'
        placeholder={placeholder}
        {...register(name, rules)}
        autoComplete={autoComplete}
      />
      {errorMessage && <span className={classNameErrorMessage}>{errorMessage}</span>}
    </div>
  )
}

export default Input
