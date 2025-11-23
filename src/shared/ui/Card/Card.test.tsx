import { render, screen } from '@testing-library/react'

import { Card } from './Card'

describe('Card', () => {
  // Тест на рендеринг заголовка и описания
  it('должна рендерить заголовок и описание', () => {
    render(<Card title='1992' description='Test Description' />)
    expect(screen.getByText('1992')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  // Тест на рендеринг числового заголовка
  it('должна корректно рендерить числовой заголовок', () => {
    render(<Card title={2023} description='Year Description' />)
    expect(screen.getByText('2023')).toBeInTheDocument()
  })
})
