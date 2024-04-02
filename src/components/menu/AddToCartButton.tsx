import { useTranslation } from 'react-i18next'
import { useCartStore } from '../../store/cart-state'
import { ProductType } from '../../types/product'
import Button from '../form/Button'

type Props = {
  item: ProductType
}

export default function AddToCartButton({ item }: Props) {
  const addCartItem = useCartStore((state) => state.addCartItem)
  const { t } = useTranslation()

  return (
    <Button onClick={() => addCartItem(item)}> {t('add')}</Button>
  )
}
