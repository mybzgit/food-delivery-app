import React from 'react'
import { IMAGE_PATH } from '../../constants'
import { ProductType } from '../../types/product'
import QuantityButtons from './QuantityButtons'
import AddToCartButton from './AddToCartButton'
import ProductImage from './ProductImage'

type Props = {
  item: ProductType
  quantity?: number
}

const Product = React.memo(
  ({ item, quantity }: Props) => {
    const { id, name, image, description, price } = item

    return (
      <div className='h-[420px] max-w-[300px] rounded-md border border-violet-800 bg-white p-4 hover:border-violet-500'>
        <ProductImage
          containerStyle='min-h-[250px] min-w-[250px]'
          imageStyle='w-full max-w-[250px] m-auto'
          src={`${IMAGE_PATH}/${image}?alt=media`}
          alt={`image of ${name}`}
        />

        <h3 className='mt-2 text-left text-lg font-medium'>{name}</h3>
        <div className='mt-2 text-left text-sm'>{description}</div>
        <div className='mt-4 flex flex-row items-center gap-2'>
          <div className='font-bold'>{price} $</div>

          {quantity === undefined ? (
            <AddToCartButton item={item} />
          ) : (
            <QuantityButtons id={id} quantity={quantity} />
          )}
        </div>
      </div>
    )
  },
  (prev, next) => {
    return (
      prev.quantity === next.quantity &&
      prev.item.name === next.item.name
    )
  },
)

export default Product
