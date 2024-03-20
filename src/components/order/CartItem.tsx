import React, { useCallback } from 'react'
import { IMAGE_PATH } from '../../constants'
import { useCartStore } from '../../store/cart-state'
import { CartItemType } from '../../types/cartItem'

type Props = {
  item: CartItemType
  quantity: number
}

const CartItem = React.memo(
  ({ item, quantity }: Props) => {
    const {
      product: { id, name, image, description, price },
    } = item

    const updateCartItem = useCartStore(
      (state) => state.updateCartItem,
    )
    const deleteCartItem = useCartStore(
      (state) => state.deleteCartItem,
    )

    const reduceQuantity = useCallback(() => {
      if (quantity == 1) deleteCartItem(id)
      else updateCartItem(id, quantity! - 1)
    }, [quantity, id, deleteCartItem, updateCartItem])

    return (
      <div className='h-[170px] w-full max-w-[500px] rounded-md border border-violet-800 bg-white p-4'>
        <div className='flex flex-row gap-4'>
          <div className='min-h-[100px] min-w-[100px]'>
            <img
              className='w-full max-w-[100px]'
              src={`${IMAGE_PATH}${image}?alt=media`}
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
          <div className='flex flex-row items-center gap-2'>
            <button
              className='btn'
              type='button'
              onClick={reduceQuantity}
            >
              -
            </button>
            <div>{quantity}</div>
            <button
              className='btn'
              type='button'
              onClick={() => updateCartItem(id, quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    )
  },
  (prev, next) => prev.quantity === next.quantity,
)

export default CartItem
