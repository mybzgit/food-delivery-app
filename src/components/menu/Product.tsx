import { useCallback } from 'react'
import { IMAGE_PATH } from '../../constants'
import { useCartStore } from '../../store/cart-state'
import { ProductType } from '../../types/product'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  item: ProductType
  quantity?: number
}

const Product = React.memo(
  ({ item, quantity }: Props) => {
    const { id, name, image, description, price } = item
    const addCartItem = useCartStore((state) => state.addCartItem)
    const updateCartItem = useCartStore(
      (state) => state.updateCartItem,
    )
    const deleteCartItem = useCartStore(
      (state) => state.deleteCartItem,
    )

    const reduceQuantity = useCallback(() => {
      if (quantity == 1) deleteCartItem(id)
      else updateCartItem(id, quantity! - 1)
    }, [quantity, id, deleteCartItem, updateCartItem])

    const { t } = useTranslation()

    return (
      <div className='h-[420px] max-w-[300px] rounded-md border border-violet-800 bg-white p-4 hover:border-violet-500'>
        <div className='min-h-[250px] min-w-[250px]'>
          <img
            className='w-full max-w-[250px]'
            src={`${IMAGE_PATH}${image}?alt=media`}
            alt={`image of ${name}`}
          />
        </div>

        <h3 className='mt-2 text-left text-lg font-medium'>{name}</h3>
        <div className='mt-2 text-left text-sm'>{description}</div>
        <div className='mt-4 flex flex-row items-center gap-2'>
          <div className='font-bold'>{price} $</div>

          {quantity == undefined ? (
            <button
              className='btn'
              type='button'
              onClick={() => addCartItem(item)}
            >
              {t('add')}
            </button>
          ) : (
            <div className='flex flex-row items-center gap-2'>
              <button
                className='btn'
                type='button'
                onClick={reduceQuantity}
              >
                -
              </button>
              <div>{quantity}</div>
              <button
                className='btn'
                type='button'
                onClick={() => updateCartItem(id, quantity + 1)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    )
  },
  (prev, next) => {
    return prev.quantity === next.quantity && prev.item.name === next.item.name
  },
)

export default Product
