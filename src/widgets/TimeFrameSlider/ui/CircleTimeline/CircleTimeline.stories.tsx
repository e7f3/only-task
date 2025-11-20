import { useState } from 'react'

import { HISTORICAL_PERIODS } from '@/entities/TimePeriod'
import {
  ACTIVE_POSITION_DEGREES,
  FULL_CIRCLE_DEGREES,
} from '@/widgets/TimeFrameSlider/model'

import { CircleTimeline } from './CircleTimeline'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Widgets/CircleTimeline',
  component: CircleTimeline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CircleTimeline>

export default meta
type Story = StoryObj<typeof meta>
type CustomStory = Partial<Story> & Pick<Story, 'render'>

/**
 * Интерактивный компонент-обертка для управления состоянием
 */
function CircleTimelineWithState() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Расчет угла поворота на основе активного индекса
  // Каждый период занимает 360/6 = 60 градусов
  // Активная позиция находится на -60 градусах (верхний правый угол)
  const rotation =
    ACTIVE_POSITION_DEGREES -
    (FULL_CIRCLE_DEGREES / HISTORICAL_PERIODS.length) * activeIndex

  return (
    <div style={{ width: '600px', height: '600px', position: 'relative' }}>
      <CircleTimeline
        periods={HISTORICAL_PERIODS}
        activeIndex={activeIndex}
        onPeriodChange={setActiveIndex}
        rotation={rotation}
      />
    </div>
  )
}

/**
 * Интерактивный вариант со всеми 6 периодами
 */
export const Default: CustomStory = {
  render: () => <CircleTimelineWithState />,
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивная демонстрация с возможностью переключения между периодами',
      },
    },
  },
}

/**
 * Первый период (Science) активен
 */
export const FirstPeriod: Story = {
  args: {
    periods: HISTORICAL_PERIODS,
    activeIndex: 0,
    onPeriodChange: () => {},
    rotation: ACTIVE_POSITION_DEGREES,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', height: '600px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * Третий период (Tech) активен
 */
export const ThirdPeriod: Story = {
  args: {
    periods: HISTORICAL_PERIODS,
    activeIndex: 2,
    onPeriodChange: () => {},
    rotation: ACTIVE_POSITION_DEGREES - (FULL_CIRCLE_DEGREES / 6) * 2,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', height: '600px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * Вариант с 3 периодами для демонстрации гибкости
 */
export const FewPeriods: Story = {
  args: {
    periods: HISTORICAL_PERIODS.slice(0, 3),
    activeIndex: 0,
    onPeriodChange: () => {},
    rotation: -60,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', height: '600px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
}
