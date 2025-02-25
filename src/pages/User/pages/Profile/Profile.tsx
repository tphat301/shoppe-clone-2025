import Input from '../../../../components/Input'

const Profile = () => {
  return (
    <div className='rounded-sm bg-white px-2 md:px-7 pb-10 md:pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg capitalize text-gray-900 font-normal'>Hồ Sơ Của Tôi</h1>
        <span className='mt-1 block text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
      </div>
      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <form className='mt-6 grow pr-0 md:pr-12 md:mt-0'>
          <div className='flex flex-wrap'>
            <div className='w-full md:w-[20%] truncate pt-3 text-start md:text-right capitalize'>Email</div>
            <div className='pl-0 w-full md:w-[80%] md:pl-5'>
              <div className='pt-3 text-gray-700'>abcd@gmail.com</div>
            </div>
          </div>
          <div className='mt-2 md:mt-6 flex flex-wrap'>
            <div className='w-full md:w-[20%] truncate pt-3 text-start md:text-right capitalize'>Tên</div>
            <div className='pl-0 w-full md:w-[80%] md:pl-5'>
              <Input
                classNameInput='bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full px-3 py-2 outline-0'
                className='ssm:mb-0 lg:mb-0 ssm:min-h-[auto]'
              />
            </div>
          </div>
          <div className='mt-2 md:mt-4 flex flex-wrap'>
            <div className='w-full md:w-[20%] truncate pt-3 text-start md:text-right capitalize'>Số điện thoại</div>
            <div className='pl-0 w-full md:w-[80%] md:pl-5'>
              <Input
                classNameInput='bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full px-3 py-2 outline-0'
                className='ssm:mb-0 lg:mb-0 ssm:min-h-[auto]'
              />
            </div>
          </div>
          <div className='mt-2 md:mt-4 flex flex-wrap'>
            <div className='w-full md:w-[20%] truncate pt-3 text-start md:text-right capitalize'>Địa chỉ</div>
            <div className='pl-0 w-full md:w-[80%] md:pl-5'>
              <Input
                classNameInput='bg-white border-[rgba(0,0,0,.14)] border-solid border-1 text-gray-900 text-sm focus:ring-[#ee4d2d] focus:border-[#ee4d2d] block w-full px-3 py-2 outline-0'
                className='ssm:mb-0 lg:mb-0 ssm:min-h-[auto]'
              />
            </div>
          </div>
          <div className='mt-2 md:mt-4 flex flex-wrap'>
            <div className='w-full md:w-[20%] truncate pt-3 text-start md:text-right capitalize'>Ngày sinh</div>
            <div className='pl-0 w-full md:w-[80%] md:pl-5'>
              <div className='flex justify-between'>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Ngày</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Tháng</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Năm</option>
                </select>
              </div>
            </div>
          </div>
        </form>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img src='' className='w-full h-full object-cover rounded-full' alt='' />
            </div>
            <input type='file' className='hidden' accept='.jpg,.jpeg,.png' />
            <button className='flex h-10 items-center justify-end border border-gray-400 bg-white px-6 text-sm shadow-sm text-gray-600 hover:cursor-pointer'>
              Chọn Ảnh
            </button>
            <div className='mt-3 text-gray-400'>Dung lượng tối đa 1 MB</div>
            <div className='mt-1 text-gray-400'>Định dạng: .JPG, .JPEG, .PNG</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
