import { useCartStore } from '../../store/cart-state'
import CartItem from './CartItem'

const CartItemList = () => {
  const cartItems = useCartStore((state) => state.items)

  return (
    <ul className='w-full space-y-4 md:w-1/3'>
      {cartItems.map((i) => (
        <li key={i.product.id}>
          <CartItem item={i} quantity={i.quantity} />
        </li>
      ))}
    </ul>
  )
}

export default CartItemList
