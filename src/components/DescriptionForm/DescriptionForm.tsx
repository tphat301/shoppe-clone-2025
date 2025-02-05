import { Link } from 'react-router-dom'

const DescriptionForm = ({ title, href }: { title: string; href: string }) => {
  return (
    <p className='text-[rgba(0,0,0,.54)]'>
      <span>Bạn đã có tài khoản? </span>
      <Link to={href} className='text-[#ee4d2d]'>
        {title}
      </Link>
    </p>
  )
}

export default DescriptionForm
