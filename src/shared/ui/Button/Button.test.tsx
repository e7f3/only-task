import { fireEvent, render, screen } from '@testing-library/react'

import { Button } from './Button'

describe('Button', () => {
  // Тест на рендеринг кнопки
  it('должна рендериться корректно', () => {
    render(<Button>Test Button</Button>)
    expect(screen.getByText('Test Button')).toBeInTheDocument()
  })

  // Тест на применение класса варианта
  it('должна применять класс варианта', () => {
    render(<Button variant='regular'>Regular Button</Button>)
    const button = screen.getByText('Regular Button')
    // Проверяем наличие класса, который генерируется CSS модулями (частичное совпадение)
    expect(button.className).toMatch(/regular/)
  })

  // Тест на обработку клика
  it('должна вызывать обработчик onClick при клике', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)

    fireEvent.click(screen.getByText('Click Me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  // Тест на отключенное состояние
  it('должна быть отключена при передаче пропса disabled', () => {
    render(<Button disabled>Disabled Button</Button>)
    expect(screen.getByText('Disabled Button')).toBeDisabled()
  })
})
