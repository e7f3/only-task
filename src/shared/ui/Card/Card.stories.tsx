import { Card } from './Card'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Shared/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Базовая карточка
 */
export const Default: Story = {
  args: {
    title: '1945',
    description: 'Окончание Второй мировой войны',
  },
}

/**
 * Карточка с длинным описанием
 */
export const LongDescription: Story = {
  args: {
    title: '1969',
    description:
      'Первая высадка человека на Луну. Нил Армстронг и Базз Олдрин стали первыми людьми, ступившими на поверхность Луны в рамках миссии Аполлон-11.',
  },
}

/**
 * Карточка с коротким описанием
 */
export const ShortDescription: Story = {
  args: {
    title: '2001',
    description: 'Запуск Wikipedia',
  },
}

/**
 * Карточка с текстовым заголовком
 */
export const TextTitle: Story = {
  args: {
    title: 'Новость',
    description: 'Важное событие произошло сегодня',
  },
}
