import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import RegisterHeader from '../../components/RegisterHeader'

const RegisterLayout = () => {
  return (
    <div>
      <RegisterHeader />
      <Outlet />
      <Footer />
    </div>
  )
}

export default RegisterLayout
