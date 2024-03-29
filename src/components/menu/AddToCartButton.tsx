import { useTranslation } from 'react-i18next'
import { useCartStore } from '../../store/cart-state'
import { ProductType } from '../../types/product'

type Props = {
  item: ProductType
}

export default function AddToCartButton({ item }: Props) {
  const addCartItem = useCartStore((state) => state.addCartItem)
  const { t } = useTranslation()

  return (
    <button
      className='btn'
      type='button'
      onClick={() => addCartItem(item)}
    >
      {t('add')}
    </button>
  )
}
