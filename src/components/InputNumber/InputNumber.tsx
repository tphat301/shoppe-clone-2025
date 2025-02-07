import { forwardRef, type InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameErrorMessage?: string
}

const InputNumber = forwardRef<HTMLInputElement, Props>(function InputNumberInner1(
  {
    className = 'ssm:mb-0 lg:mb-1 ssm:min-h-[91px]',
    classNameInput = 'bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full p-2.5 outline-0',
    type,
    classNameErrorMessage = 'text-red-600',
    errorMessage,
    onChange,
    ...rest
  }: Props,
  ref
) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value && /^\d+/.test(value) && onChange) onChange(e)
  }
  return (
    <div className={className}>
      <input type={type} onChange={handleChange} className={classNameInput} {...rest} ref={ref} />
      {errorMessage && <span className={classNameErrorMessage}>{errorMessage}</span>}
    </div>
  )
})

export default InputNumber
