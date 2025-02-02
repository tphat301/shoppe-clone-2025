import { Link } from 'react-router-dom'

interface Props {
  title: string
  href: string
}

const DescriptionForm = ({ title, href }: Props) => {
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
