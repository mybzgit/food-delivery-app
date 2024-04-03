import type { Meta, StoryObj } from '@storybook/react'

import Product from '../components/menu/Product'

const meta: Meta<typeof Product> = {
  component: Product,
}
export default meta
type Story = StoryObj<typeof Product>

export const NonAddedProduct: Story = {
  args: {
    item: {
      id: '1',
      name: 'Product 1',
      description: 'Description of Product 1',
      price: 235,
      image: 'image1.jpg',
    },
  },
}

export const AddedProduct: Story = {
  args: {
    item: {
      id: '1',
      name: 'Product 1',
      description: 'Description of Product 1',
      price: 235,
      image: 'image1.jpg',
    },
    quantity: 2,
  },
}
