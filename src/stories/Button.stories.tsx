import type { Meta, StoryObj } from '@storybook/react'

import Button from '../components/form/Button'

const meta: Meta<typeof Button> = {
  component: Button,
}
export default meta
type Story = StoryObj<typeof Button>

export const PrimaryButton: Story = {
  args: {
    variant: 'primary',
    children: 'Click'
  },
}
export const LineButton: Story = {
    args: {
      variant: 'line',
      children: 'Click'
    },
  }
