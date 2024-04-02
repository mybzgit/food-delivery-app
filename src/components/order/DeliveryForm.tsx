import { useCallback, useState } from 'react'
import { Order, paymentTypes } from '../../types/order'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { postData } from '../../utils/fetchData'
import { useAppStore } from '../../store/app-state'
import { useCartStore } from '../../store/cart-state'
import ValidationErrors from '../layout/ValidationErrors'
import { useTranslation } from 'react-i18next'
import Button from '../form/Button'

const DeliveryForm = () => {
  const [errors, setErrors] = useState<string[]>([])

  const navigate = useNavigate()

  const [street, setStreet] = useState('')
  const [building, setBuilding] = useState('')
  const [apartment, setApartment] = useState('')
  const [paymentType, setPaymentType] = useState(paymentTypes[0].id)

  const token = useAppStore((state) => state.token)
  const userId = useAppStore((state) => state.userId)
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  const placeOrderMutation = useMutation({
    mutationFn: (order: Order) => {
      return postData('orders.json', order, token!)
    },
    onSuccess: (data) => {
      clearCart()
      navigate(`/success-order/${data.name}`)
    },
    onError: (error) => {
      setErrors([error.message])
    },
  })

  const onPlaceOrder = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()

      const errorArr = []
      if (street.trim() == '') errorArr.push('Street is empty')
      if (building.trim() == '') errorArr.push('Building is empty')

      if (errorArr.length > 0) {
        setErrors(errorArr)
        return
      } else {
        setErrors([])
        const order: Order = {
          userId: userId!,
          items,
          address: `${street}, ${building}, ${apartment}`,
          paymentType,
          date: new Date().toDateString(),
        }
        placeOrderMutation.mutate(order)
      }
    },
    [
      street,
      building,
      apartment,
      userId,
      paymentType,
      items,
      placeOrderMutation,
    ],
  )

  const { t } = useTranslation()

  return (
    <form className='mt-4 grid gap-2 md:grid-cols-2'>
      <div>
        <label className='label' htmlFor='street'>
          {t('street')}
        </label>
        <input
          type='text'
          id='street'
          name='street'
          value={street}
          className='w-full'
          onChange={(e) => setStreet(e.currentTarget.value)}
        />
      </div>

      <div>
        <label className='label' htmlFor='building'>
          {t('building')}
        </label>
        <input
          type='text'
          id='building'
          name='building'
          value={building}
          onChange={(e) => setBuilding(e.currentTarget.value)}
        />
      </div>
      <div>
        <label className='label' htmlFor='Apartment'>
          {t('apartment')}
        </label>
        <input
          type='text'
          id='apartment'
          name='apartment'
          value={apartment}
          onChange={(e) => setApartment(e.currentTarget.value)}
        />
      </div>
      <div>
        <label className='label' htmlFor='paymenttype'>
          {t('payment')}
        </label>
        <select
          id='paymenttype'
          value={paymentType}
          onChange={(e) => setPaymentType(e.currentTarget.value)}
        >
          {paymentTypes.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {errors.length > 0 && <ValidationErrors errors={errors} />}

      <Button
        className='col-start-1 mt-2'
        type='submit'
        onClick={onPlaceOrder}
      >
        {t('place-order')}
      </Button>
    </form>
  )
}

export default DeliveryForm
