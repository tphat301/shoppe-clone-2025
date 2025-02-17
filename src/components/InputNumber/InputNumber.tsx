import { forwardRef, useState, type InputHTMLAttributes } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameErrorMessage?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner1(
  {
    className = 'ssm:mb-0 lg:mb-1 ssm:min-h-[91px]',
    classNameInput = 'bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full p-2.5 outline-0',
    type,
    classNameErrorMessage = 'text-red-600',
    errorMessage,
    onChange,
    value = '',
    ...rest
  }: InputNumberProps,
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (/^\d+/.test(value) || value === '') {
      onChange && onChange(e)
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input
        type={type}
        onChange={handleChange}
        className={classNameInput}
        value={value || localValue}
        {...rest}
        ref={ref}
      />
      {errorMessage && <span className={classNameErrorMessage}>{errorMessage}</span>}
    </div>
  )
})

export default InputNumber
