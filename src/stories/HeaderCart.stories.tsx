import type { Meta, StoryObj } from '@storybook/react'

import HeaderCart from '../components/layout/HeaderCart'

const meta: Meta<typeof HeaderCart> = {
  component: HeaderCart,
}
export default meta
type Story = StoryObj<typeof HeaderCart>

export const EmptyCart: Story = {
  args: {
    itemCount: 0,
    token: 'test'
  },
}

export const NonEmptyCart: Story = {
  args: {
    itemCount: 12,
    token: 'test'
  },
}
