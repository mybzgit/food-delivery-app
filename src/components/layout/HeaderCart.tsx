import { Link } from 'react-router-dom'
import CartIcon from '../icons/CartIcon'

type Props = {
  itemCount: number
  token: string | null
}

const HeaderCart = ({ itemCount, token }: Props) => {
  return (
    <Link className='relative cursor-pointer block w-max' to='cart'>
      <CartIcon className='h-[32px] w-[32px] text-violet-700 hover:text-violet-500' />
      {itemCount > 0 && token !== null && (
        <div className='absolute -bottom-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full border border-violet-800 bg-white p-1 text-xs text-violet-800 shadow-md'>
          {itemCount}
        </div>
      )}
    </Link>
  )
}

export default HeaderCart
