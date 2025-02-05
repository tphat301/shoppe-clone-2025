const SortProductList = () => {
  return (
    <div className='py-4 px-3 bg-gray-300/40'>
      <div className='flex flex-wrap justify-between items-center gap-2'>
        <div className='flex justify-between items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button className='h-8 px-4 bg-[#ee4d2d] hover:bg-[#ee4d2dd2] hover:cursor-pointer text-white capitalize'>
            Phổ biến
          </button>
          <button className='h-8 px-4 bg-white hover:bg-slate-100 hover:cursor-pointer text-black capitalize'>
            Mới nhất
          </button>
          <button className='h-8 px-4 bg-white hover:bg-slate-100 hover:cursor-pointer text-black capitalize'>
            Bán chạy
          </button>
          <select
            className='h-8 px-2 bg-white hover:bg-slate-100 hover:cursor-pointer text-black capitalize text-left outline-0 text-sm'
            defaultValue=''
          >
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>Giá từ thấp đến cao</option>
            <option value='price:desc'>Giá từ cao đến thâp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-[#ee4d2d]'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2'>
            <button className='px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white/60 hover:cursor-not-allowed hover:bg-slate-100 shadow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='px-3 h-8 rounded-tr-sm rounded-br-sm bg-white hover:cursor-pointer hover:bg-slate-100 shadow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductList
