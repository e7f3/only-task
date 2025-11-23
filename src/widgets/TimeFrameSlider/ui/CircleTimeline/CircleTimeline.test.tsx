import { fireEvent, render, screen } from '@testing-library/react'
import gsap from 'gsap'

import { HISTORICAL_PERIODS } from '@/entities/TimePeriod'

import { CircleTimeline } from './CircleTimeline'

describe('CircleTimeline', () => {
  const mockOnPeriodChange = jest.fn()
  const defaultProps = {
    periods: HISTORICAL_PERIODS,
    activeIndex: 0,
    onPeriodChange: mockOnPeriodChange,
    rotation: 0,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Тест на рендеринг правильного количества точек
  it('должна рендерить правильное количество точек', () => {
    render(<CircleTimeline {...defaultProps} />)
    const points = screen.getAllByRole('button')
    expect(points).toHaveLength(HISTORICAL_PERIODS.length)
  })

  // Тест на активную точку
  it('должна корректно отображать активную точку', () => {
    render(<CircleTimeline {...defaultProps} activeIndex={1} />)
    const points = screen.getAllByRole('button')

    // Проверяем aria-current для доступности
    expect(points[1]).toHaveAttribute('aria-current', 'true')
    expect(points[0]).toHaveAttribute('aria-current', 'false')
  })

  // Тест на клик по точке
  it('должна вызывать onPeriodChange при клике по точке', () => {
    render(<CircleTimeline {...defaultProps} />)
    const points = screen.getAllByRole('button')

    fireEvent.click(points[2])
    expect(mockOnPeriodChange).toHaveBeenCalledWith(2)
  })

  // Тест на вызов GSAP анимации
  it('должна вызывать GSAP анимацию при изменении rotation', () => {
    const { rerender } = render(<CircleTimeline {...defaultProps} />)

    rerender(<CircleTimeline {...defaultProps} rotation={60} />)

    // Проверяем, что gsap.to был вызван
    expect(gsap.to).toHaveBeenCalled()
  })
})
