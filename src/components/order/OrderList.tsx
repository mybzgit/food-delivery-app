import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../../store/app-state'
import { Order } from '../../types/order'
import { fetchData } from '../../utils/fetchData'
import Loader from '../layout/Loader'
import OrderItem from './OrderItem'

const OrderList = () => {
  const token = useAppStore((state) => state.token)
  const userId = useAppStore((state) => state.userId)

  const { data, error, isLoading, isError, isFetched } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      fetchData(
        'orders.json',
        token!,
        `&orderBy="userId"&equalTo="${userId}"`,
      ),
  })

  const orders = useMemo(() => {
    return data != undefined
      ? Object.keys(data).map((id) => ({
          ...data[id],
          id,
        }))
      : undefined
  }, [data])

  const { t } = useTranslation()

  return (
    <>
      <h3 className='text-left text-lg font-medium md:text-center'>
        {t('order-history')}
      </h3>
      {isFetched && orders?.length == 0 && (
        <div>{t('no-orders')}</div>
      )}
      {isLoading && <Loader />}
      {isError && <div className='text-red-500'>{error.message}</div>}
      <ul className='mx-auto mt-2 space-y-2 pb-4 md:w-2/3'>
        {orders?.map((o: Order) => (
          <li key={o.id}>
            <OrderItem order={o} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default OrderList
