import ChevronLeftIcon from '@/shared/assets/chevron--left.svg'

import { Button } from './Button'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['round', 'regular'],
      description: 'Вариант внешнего вида',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Размер кнопки',
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Цветовая схема',
    },
    disabled: {
      control: 'boolean',
      description: 'Активность кнопки',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Базовая кнопка
 */
export const Default: Story = {
  args: {
    children: 'Submit',
    variant: 'regular',
    size: 'medium',
    colorScheme: 'primary',
  },
}

/**
 * Альтернативная цветовая схема
 */
export const SecondaryColorScheme: Story = {
  args: {
    children: 'Submit',
    variant: 'regular',
    size: 'medium',
    colorScheme: 'secondary',
  },
}

/**
 * Маленькая кнопка
 */
export const Small: Story = {
  args: {
    children: 'Submit',
    size: 'small',
  },
}

/**
 * Большая кнопка
 */
export const Large: Story = {
  args: {
    children: 'Submit',
    size: 'large',
  },
}

/**
 * Кнопка с SVG иконкой (шеврон)
 */
export const WithIcon: Story = {
  args: {
    children: <ChevronLeftIcon />,
    variant: 'round',
    size: 'medium',
  },
}

/**
 * Отключенная кнопка
 */
export const Disabled: Story = {
  args: {
    children: 'Submit',
    disabled: true,
  },
}
