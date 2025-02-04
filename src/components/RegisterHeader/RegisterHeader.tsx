import { Link, useMatch } from 'react-router-dom'
import { path } from '../../constants/path'

const RegisterHeader = () => {
  const match = useMatch(path.register)
  const isRegister = Boolean(match)
  return (
    <header className='ssm:py-3 lg:py-5 bg-white'>
      <div className='wrap-content'>
        <Link to='/' title='Shoppe'>
          <p className='text-[#ee4d2d] ssm:text-xl lg:text-2xl capitalize'>
            Shoppe - <span className='text-black'>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</span>
          </p>
        </Link>
      </div>
    </header>
  )
}

export default RegisterHeader
