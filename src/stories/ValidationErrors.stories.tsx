import type { Meta, StoryObj } from '@storybook/react'

import ValidationErrors from '../components/layout/ValidationErrors'

const meta: Meta<typeof ValidationErrors> = {
  component: ValidationErrors,
}
export default meta
type Story = StoryObj<typeof ValidationErrors>

export const ValidationErrorsList: Story = {
  args: {
    errors: ['error 1', 'error 2'],
  },
}
