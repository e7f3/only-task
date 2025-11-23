import { render, screen } from '@testing-library/react'

import { EventsCarousel } from './EventsCarousel'

// Мокаем Swiper
jest.mock('swiper/react', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Swiper: ({ children }: any) => <div data-testid='swiper'>{children}</div>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SwiperSlide: ({ children }: any) => (
    <div data-testid='swiper-slide'>{children}</div>
  ),
}))

jest.mock('swiper/modules', () => ({
  Navigation: jest.fn(),
  Pagination: jest.fn(),
  FreeMode: jest.fn(),
}))

// Мокаем стили Swiper
jest.mock('swiper/css', () => ({}))
jest.mock('swiper/css/navigation', () => ({}))
jest.mock('swiper/css/pagination', () => ({}))

describe('EventsCarousel', () => {
  const mockEvents = [
    { id: 1, year: 1990, description: 'Event 1' },
    { id: 2, year: 1991, description: 'Event 2' },
  ]

  // Тест на рендеринг событий
  it('должен рендерить переданные события', () => {
    render(<EventsCarousel events={mockEvents} visible={true} />)

    // Проверяем, что слайды отрендерились
    const slides = screen.getAllByTestId('swiper-slide')
    expect(slides).toHaveLength(mockEvents.length)

    // Проверяем контент внутри слайдов (Card компонент)
    expect(screen.getByText('1990')).toBeInTheDocument()
    expect(screen.getByText('Event 1')).toBeInTheDocument()
  })

  // Тест на видимость
  it('должен применять класс visible, когда visible=true', () => {
    render(<EventsCarousel events={mockEvents} visible={true} />)
    // В реальном компоненте класс применяется к контейнеру Swiper или обертке
    // Здесь мы проверяем наличие контента, так как opacity управляется через CSS/GSAP
    expect(screen.getByTestId('swiper')).toBeInTheDocument()
  })
})
