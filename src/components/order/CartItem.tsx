import React from 'react'
import { IMAGE_PATH } from '../../constants'
import { CartItemType } from '../../types/cartItem'
import QuantityButtons from '../menu/QuantityButtons'

type Props = {
  item: CartItemType
  quantity: number
}

const CartItem = React.memo(
  ({ item, quantity }: Props) => {
    const {
      product: { id, name, image, description, price },
    } = item

    return (
      <div className='h-[170px] w-full max-w-[500px] rounded-md border border-violet-800 bg-white p-4'>
        <div className='flex flex-row gap-4'>
          <div className='min-h-[100px] min-w-[100px]'>
            <img
              className='w-full max-w-[100px]'
              src={`${IMAGE_PATH}/${image}?alt=media`}
              alt={`image of ${name}`}
            />
          </div>

          <div className='space-y-2 text-left'>
            <h3 className='text-lg font-medium'>{name}</h3>
            <div className=' text-sm'>{description}</div>
            <div className='font-bold'>{price} $</div>
          </div>
        </div>
        <div className='float-right mt-2 flex flex-row items-center gap-2'>
          <QuantityButtons id={id} quantity={quantity} />
        </div>
      </div>
    )
  },
  (prev, next) => prev.quantity === next.quantity,
)

export default CartItem
