import { Link, useParams } from 'react-router-dom'

const SuccessOrder = () => {
  const params = useParams()
  return (
    <div className='text-lg'>
      <h2 className='mb-4'>
        {'Your order '}
        <span className='font-medium'>"{params.id}"</span>
        {' has been successfully placed!'}
      </h2>
      <Link to='/' className='mr-4'>
        Orders
      </Link>
      <Link to='/menu'>Menu</Link>
    </div>
  )
}

export default SuccessOrder
