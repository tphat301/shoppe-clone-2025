import { range } from 'lodash'
import { useState } from 'react'
interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

const DateSelect = ({ onChange, value, errorMessage }: Props) => {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target
    const newDate = {
      ...date,
      [name]: value
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }
  return (
    <div className='mt-2 md:mt-4 flex flex-wrap'>
      <div className='w-full md:w-[20%] truncate pt-3 text-start md:text-right capitalize'>Ngày sinh</div>
      <div className='pl-0 w-full md:w-[80%] md:pl-5'>
        <div className='flex justify-between'>
          <select
            name='date'
            onChange={handleChange}
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3'
            value={value?.getDate() || date.date}
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            name='month'
            onChange={handleChange}
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3'
            value={value?.getMonth() || date.month}
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            name='year'
            onChange={handleChange}
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3'
            value={value?.getFullYear() || date.year}
          >
            <option disabled>Năm</option>
            {range(1990, 2026).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {errorMessage && <span className='text-red-600'>{errorMessage}</span>}
      </div>
    </div>
  )
}

export default DateSelect
