import { useTranslation } from 'react-i18next'
import CartItemList from '../components/order/CartItemList'
import DeliveryForm from '../components/order/DeliveryForm'
import { useCartSum, useItemCount } from '../store/cart-state'

const CartPage = () => {
  const cartSum = useCartSum()
  const itemCount = useItemCount()
  const { t } = useTranslation()

  if (itemCount == 0)
    return <h3 className='text-xl'>{t('empty-cart')}</h3>

  return (
    <>
      <h3 className='text-left text-xl font-bold md:text-center'>
        {t('order')}
      </h3>
      <div className='mt-2 flex flex-col-reverse justify-center gap-10 md:mt-8 md:flex-row'>
        <CartItemList />
        <div>
          <div className='text-left text-lg font-semibold'>
            {t('total')} {itemCount} {t('items')} {cartSum} $
          </div>
          <DeliveryForm />
        </div>
      </div>
    </>
  )
}

export default CartPage
