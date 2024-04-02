import { useCallback } from 'react'
import { useCartStore } from '../../store/cart-state'
import { ProductType } from '../../types/product'
import Button from '../form/Button'

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
      <Button onClick={reduceQuantity}>-</Button>
      <div>{quantity}</div>
      <Button onClick={() => updateCartItem(id, quantity + 1)}>
        +
      </Button>
    </div>
  )
}

export default QuantityButtons
