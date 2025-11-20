import { HISTORICAL_PERIODS } from '@/entities/TimePeriod'

import { EventsCarousel } from './EventsCarousel'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Widgets/EventsCarousel',
  component: EventsCarousel,
  parameters: {
    layout: 'fullwidth',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '0 50px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Видимость карусели (управляет анимацией)',
    },
  },
} satisfies Meta<typeof EventsCarousel>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Базовая карусель с событиями первого периода
 */
export const Default: Story = {
  args: {
    events: HISTORICAL_PERIODS[0].events,
    visible: true,
  },
}

/**
 * Карусель с событиями второго периода (Cinema)
 */
export const CinemaPeriod: Story = {
  args: {
    events: HISTORICAL_PERIODS[1].events,
    visible: true,
  },
}

/**
 * Скрытая карусель (для демонстрации анимации)
 */
export const Hidden: Story = {
  args: {
    events: HISTORICAL_PERIODS[0].events,
    visible: false,
  },
}

/**
 * Карусель с малым количеством событий
 */
export const FewEvents: Story = {
  args: {
    events: HISTORICAL_PERIODS[0].events.slice(0, 2),
    visible: true,
  },
}
