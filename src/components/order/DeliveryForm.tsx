import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/app-state'
import { useCartStore } from '../../store/cart-state'
import { Order, PaymentType, paymentTypes } from '../../types/order'
import { postData } from '../../utils/fetchData'
import Button from '../form/Button'
import ValidationErrors from '../layout/ValidationErrors'

type ValuesType = {
  street: string
  building: string
  apartment: string
  paymentType: PaymentType["name"]
}

const validate = (values: ValuesType) => {
  const errors = {} as ValuesType
  const { street, building } = values

  if (street.trim() == '') errors.street = 'Street is empty'
  if (building.trim() == '') errors.building = 'Building is empty'

  return errors
}

const DeliveryForm = () => {
  const [errors, setErrors] = useState<string[]>([])
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      street: '',
      building: '',
      apartment: '',
      paymentType: paymentTypes[0].id,
    },
    validate,
    onSubmit: (values: ValuesType) => {
      const { street, building, apartment, paymentType } = values
      setErrors([])
      const order: Order = {
        userId: userId!,
        items,
        address: `${street}, ${building}, ${apartment}`,
        paymentType,
        date: new Date().toDateString(),
      }
      placeOrderMutation.mutate(order)
    },
  })

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

  const { t } = useTranslation()

  return (
    <form
      className='mt-4 grid gap-2 md:grid-cols-2'
      onSubmit={formik.handleSubmit}
    >
      <div>
        <label className='label' htmlFor='street'>
          {t('street')}
        </label>
        <input
          type='text'
          id='street'
          name='street'
          value={formik.values.street}
          className='w-full'
          onChange={formik.handleChange}
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
          value={formik.values.building}
          onChange={formik.handleChange}
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
          value={formik.values.apartment}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <label className='label' htmlFor='paymenttype'>
          {t('payment')}
        </label>
        <select
          id='paymenttype'
          value={formik.values.paymentType}
          onChange={formik.handleChange}
        >
          {paymentTypes.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {formik.errors.street ? (
        <ValidationErrors errors={[formik.errors.street]} />
      ) : null}
      {formik.errors.building ? (
        <ValidationErrors errors={[formik.errors.building]} />
      ) : null}
      {errors.length > 0 && <ValidationErrors errors={errors} />}

      <Button className='col-start-1 mt-2' type='submit'>
        {t('place-order')}
      </Button>
    </form>
  )
}

export default DeliveryForm
