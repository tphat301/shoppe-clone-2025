import type { Meta, StoryObj } from '@storybook/react'

import Button from './Button'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shoppe/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Large: Story = {
  args: {
    children: 'Button',
    className:
      'text-white bg-[#ee4d2d] hover:bg-[#ee4d2dd2] focus:ring-4 focus:ring-[#ee4d2d78] font-medium text-sm px-5 py-2.5 me-2 mb-3 focus:outline-none w-full uppercase ssm:mt-1 lg:mt-0 hover:cursor-pointer flex items-center justify-center'
  }
}

export const LoadingButton: Story = {
  args: {
    children: 'Button',
    isLoading: true,
    className:
      'text-white bg-[#ee4d2d] hover:bg-[#ee4d2dd2] focus:ring-4 focus:ring-[#ee4d2d78] font-medium text-sm px-5 py-2.5 me-2 mb-3 focus:outline-none w-full uppercase ssm:mt-1 lg:mt-0 hover:cursor-pointer flex items-center justify-center'
  }
}
