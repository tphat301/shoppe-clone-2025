import { Fragment } from 'react/jsx-runtime'
import InputNumber, { type InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  classNameWrap?: string
  max?: number
  onIncrease?: (value: number) => void
}

const QuantityController = ({ classNameWrap = 'mt-2', max, onIncrease, value, ...rest }: Props) => {
  const handleIncrease = () => {
    let _value = Number(value) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onIncrease && onIncrease(_value)
  }
  return (
    <Fragment>
      Số lượng:
      <div className={'flex items-center ' + classNameWrap}>
        <button
          className='px-2 border-1 border-gray-300 border-r-0 flex justify-center items-center hover:cursor-pointer h-[30px] rounded-tl-[4px] rounded-bl-[4px]'
          onClick={handleIncrease}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-3'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
          </svg>
        </button>
        <InputNumber
          className=''
          classNameInput='border-1 border-gray-300 outline-0 w-[50px] h-[30px] px-2 text-center'
          value={value}
          {...rest}
        />
        <button className='px-2 border-1 border-gray-300 border-l-0 flex justify-center items-center hover:cursor-pointer h-[30px] rounded-tr-[4px] rounded-br-[4px]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-3'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </button>
      </div>
    </Fragment>
  )
}

export default QuantityController
