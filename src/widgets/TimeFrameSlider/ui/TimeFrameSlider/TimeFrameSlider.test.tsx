import { fireEvent, render, screen } from '@testing-library/react'

import { HISTORICAL_PERIODS } from '@/entities/TimePeriod'

import { TimeFrameSlider } from './TimeFrameSlider'

// Мокаем дочерние компоненты, чтобы тестировать изолированно
jest.mock('../CircleTimeline/CircleTimeline', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CircleTimeline: ({ activeIndex, onPeriodChange }: any) => (
    <div data-testid='circle-timeline'>
      <button onClick={() => onPeriodChange(activeIndex + 1)}>
        Next Period
      </button>
      <span>Active: {activeIndex}</span>
    </div>
  ),
}))

jest.mock('../EventsCarousel/EventsCarousel', () => ({
  EventsCarousel: () => <div data-testid='events-carousel'>Carousel</div>,
}))

describe('TimeFrameSlider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Тест на рендеринг заголовка
  it('должен рендерить заголовок', () => {
    render(<TimeFrameSlider />)
    expect(screen.getByText('Исторические даты')).toBeInTheDocument()
  })

  // Тест на отображение начального периода
  it('должен отображать начальный период (первый в списке)', () => {
    render(<TimeFrameSlider />)
    const firstPeriod = HISTORICAL_PERIODS[0]
    expect(screen.getByText(firstPeriod.yearFrom)).toBeInTheDocument()
    expect(screen.getByText(firstPeriod.yearTo)).toBeInTheDocument()
  })

  // Тест на переключение вперед
  it('должен переключать период вперед при клике на кнопку "Следующий"', () => {
    render(<TimeFrameSlider />)

    const nextButton = screen.getByLabelText('Следующий период')
    fireEvent.click(nextButton)

    // Проверяем, что отображается второй период
    const secondPeriod = HISTORICAL_PERIODS[1]
    expect(screen.getByText(secondPeriod.yearFrom)).toBeInTheDocument()
  })

  // Тест на переключение назад
  it('должен переключать период назад при клике на кнопку "Предыдущий"', () => {
    render(<TimeFrameSlider />)

    // Сначала переключаем вперед, чтобы не быть на первом элементе (хотя логика циклична)
    const nextButton = screen.getByLabelText('Следующий период')
    fireEvent.click(nextButton)

    // Теперь назад
    const prevButton = screen.getByLabelText('Предыдущий период')
    fireEvent.click(prevButton)

    // Должны вернуться к первому периоду
    const firstPeriod = HISTORICAL_PERIODS[0]
    expect(screen.getByText(firstPeriod.yearFrom)).toBeInTheDocument()
  })

  // Тест на пагинацию (точки)
  it('должен переключать период при клике на точку пагинации', () => {
    render(<TimeFrameSlider />)

    const dots = screen.getAllByLabelText(/Перейти к периоду/)
    fireEvent.click(dots[2]) // Клик по 3-й точке

    const thirdPeriod = HISTORICAL_PERIODS[2]
    expect(screen.getByText(thirdPeriod.yearFrom)).toBeInTheDocument()
  })
})
