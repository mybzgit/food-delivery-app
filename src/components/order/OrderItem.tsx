import { useMemo } from 'react'
import { Order } from '../../types/order'
import { IMAGE_PATH } from '../../constants'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../../store/app-state'

type Props = {
  order: Order
}

const OrderItem = ({ order }: Props) => {
  const { items, address, paymentType, date } = order

  const totalSum = useMemo(() => {
    return items?.reduce(
      (sum, curr) => sum + curr.product.price * curr.quantity,
      0,
    )
  }, [items])

  const { t } = useTranslation()
  const locale = useAppStore((state) => state.locale)

  return (
    <div className='space-y-2 rounded-md border border-violet-800 bg-white bg-white p-2 text-left'>
      <div className='inline space-x-1'>
        <span className='font-semibold'>{t('date')}</span>
        <span>
          {date
            ? new Date(date).toLocaleDateString(
                locale == 'en' ? 'en-US' : 'ru-RU',
              )
            : '-'}
          ,
        </span>
        <span className='font-semibold'>{t('address')}</span>
        <span>{address},</span>
        <span className='font-semibold'>{t('payment')}</span>
        <span>{paymentType}</span>
      </div>
      <ul className='space-y-2'>
        {items.map((i) => (
          <li
            key={i.product.id}
            className='ml-2 flex flex-row items-center gap-2'
          >
            <img
              className='w-full max-w-[50px]'
              src={`${IMAGE_PATH}${i.product.image}?alt=media`}
              alt={`image of ${i.product.name}`}
            />
            {i.product.name} ({i.product.price} $) x {i.quantity}
          </li>
        ))}
      </ul>
      <div>
        <span className='font-semibold'>{t('total')}</span>
        {totalSum} $
      </div>
    </div>
  )
}

export default OrderItem
