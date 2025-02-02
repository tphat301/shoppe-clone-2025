import { Link } from 'react-router-dom'

const RegisterHeader = () => {
  return (
    <header className='ssm:py-3 lg:py-5 bg-white'>
      <div className='wrap-content'>
        <Link to='/' title='Shoppe'>
          <p className='text-[#ee4d2d] ssm:text-xl lg:text-2xl capitalize'>
            Shoppe - <span className='text-black'>Đăng ký</span>
          </p>
        </Link>
      </div>
    </header>
  )
}

export default RegisterHeader
