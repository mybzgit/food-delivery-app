import { useCallback } from 'react'
import { useCartStore } from '../../store/cart-state'
import { ProductType } from '../../types/product'

type Props = {
  id: ProductType['id']
  quantity: number
}

const QuantityButtons = ({ id, quantity }: Props) => {
  const updateCartItem = useCartStore((state) => state.updateCartItem)
  const deleteCartItem = useCartStore((state) => state.deleteCartItem)

  const reduceQuantity = useCallback(() => {
    if (quantity == 1) deleteCartItem(id)
    else updateCartItem(id, quantity - 1)
  }, [quantity, id, deleteCartItem, updateCartItem])

  return (
    <div className='flex flex-row items-center gap-2'>
      <button className='btn' type='button' onClick={reduceQuantity}>
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
  )
}

export default QuantityButtons
