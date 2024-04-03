import type { Meta, StoryObj } from '@storybook/react'

import Loader from '../components/layout/Loader'

const meta: Meta<typeof Loader> = {
  component: Loader,
}
export default meta
type Story = StoryObj<typeof Loader>

export const LoaderStory: Story = {
  args: {},
}
