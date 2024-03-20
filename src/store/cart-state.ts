import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItemType } from '../types/cartItem'
import { ProductType } from '../types/product'

type CartState = {
  items: CartItemType[]
  addCartItem: (product: ProductType) => void
  updateCartItem: (id: ProductType['id'], quantity: number) => void
  deleteCartItem: (id: ProductType['id']) => void
  clearCart: () => void
}

export const useCartStore = create<
  CartState,
  [['zustand/persist', CartState]]
>(
  persist(
    (set, get) => ({
      items: [],
      addCartItem: (product) => {
        set({ items: [...get().items, { product, quantity: 1 }] })
      },
      updateCartItem: (id, quantity) => {
        const items = get().items
        const item = items.find((i) => i.product.id === id)
        item!.quantity = quantity
        set({ items: [...items] })
      },
      deleteCartItem: (id) => {
        set({ items: get().items.filter((i) => i.product.id !== id) })
      },
      clearCart: () => set({ items: [] as CartItemType[] }),
    }),
    {
      name: 'cart-storage',
    },
  ),
)

export const useItemCount = () => {
  const items = useCartStore((state) => state.items)
  if (items == undefined) return 0
  else
    return items
      ?.map(({ quantity }) => quantity)
      .reduce((sum, curr) => sum + curr, 0)
}

export const useCartSum = () => {
  const items = useCartStore((state) => state.items)
  if (items == undefined) return 0
  else
    return items?.reduce(
      (sum, curr) => sum + curr.product.price * curr.quantity,
      0,
    )
}
