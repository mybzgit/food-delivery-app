import { CartItemType } from './cartItem'

export type Order = {
  id?: string
  userId: string
  items: CartItemType[]
  address: string
  paymentType: string
  date: string
}

export type PaymentType = {
  id: string
  name: string
}
export const paymentTypes: PaymentType[] = [
  {
    id: 'card',
    name: 'Credit card',
  },
  { id: 'cash', name: 'Cash' },
  { id: 'online', name: 'Online' },
]
