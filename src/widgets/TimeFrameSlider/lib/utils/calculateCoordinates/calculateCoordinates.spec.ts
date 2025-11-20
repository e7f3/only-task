import { CIRCLE_RADIUS } from '@/widgets/TimeFrameSlider/model'

import { calculateCoordinates } from './calculateCoordinates'

describe('calculateCoordinates', () => {
  // Тесты на валидацию dotsAmount
  describe('Валидация dotsAmount', () => {
    it('должен выбросить ошибку, если dotsAmount меньше 2', () => {
      expect(() => calculateCoordinates(1, 0)).toThrow(
        'Количество точек должно быть от 2 до 6'
      )
    })

    it('должен выбросить ошибку, если dotsAmount равен 0', () => {
      expect(() => calculateCoordinates(0, 0)).toThrow(
        'Количество точек должно быть от 2 до 6'
      )
    })

    it('должен выбросить ошибку, если dotsAmount отрицательный', () => {
      expect(() => calculateCoordinates(-1, 0)).toThrow(
        'Количество точек должно быть от 2 до 6'
      )
    })

    it('должен выбросить ошибку, если dotsAmount больше 6', () => {
      expect(() => calculateCoordinates(7, 0)).toThrow(
        'Количество точек должно быть от 2 до 6'
      )
    })
  })

  // Тесты на валидацию dotIndex
  describe('Валидация dotIndex', () => {
    it('должен выбросить ошибку, если dotIndex отрицательный', () => {
      expect(() => calculateCoordinates(4, -1)).toThrow(
        'Индекс точки должен быть от 0 до 5'
      )
    })

    it('должен выбросить ошибку, если dotIndex больше 5', () => {
      expect(() => calculateCoordinates(6, 6)).toThrow(
        'Индекс точки должен быть от 0 до 5'
      )
    })

    it('должен выбросить ошибку, если dotIndex больше или равен dotsAmount', () => {
      expect(() => calculateCoordinates(3, 3)).toThrow(
        'Индекс точки должен быть меньше количества точек'
      )
    })

    it('должен выбросить ошибку, если dotIndex больше dotsAmount', () => {
      expect(() => calculateCoordinates(2, 4)).toThrow(
        'Индекс точки должен быть меньше количества точек'
      )
    })
  })

  // Тесты на корректные вычисления координат
  describe('Корректные вычисления координат', () => {
    it('должен вернуть корректные координаты для 2 точек, индекс 0', () => {
      const result = calculateCoordinates(2, 0)
      expect(result.x).toBeCloseTo(CIRCLE_RADIUS, 5)
      expect(result.y).toBeCloseTo(0, 5)
    })

    it('должен вернуть корректные координаты для 2 точек, индекс 1', () => {
      const result = calculateCoordinates(2, 1)
      expect(result.x).toBeCloseTo(-CIRCLE_RADIUS, 5)
      expect(result.y).toBeCloseTo(0, 5)
    })

    it('должен вернуть корректные координаты для 4 точек, индекс 0', () => {
      const result = calculateCoordinates(4, 0)
      expect(result.x).toBeCloseTo(CIRCLE_RADIUS, 5)
      expect(result.y).toBeCloseTo(0, 5)
    })

    it('должен вернуть корректные координаты для 4 точек, индекс 1', () => {
      const result = calculateCoordinates(4, 1)
      expect(result.x).toBeCloseTo(0, 5)
      expect(result.y).toBeCloseTo(CIRCLE_RADIUS, 5)
    })

    it('должен вернуть корректные координаты для 4 точек, индекс 2', () => {
      const result = calculateCoordinates(4, 2)
      expect(result.x).toBeCloseTo(-CIRCLE_RADIUS, 5)
      expect(result.y).toBeCloseTo(0, 5)
    })

    it('должен вернуть корректные координаты для 4 точек, индекс 3', () => {
      const result = calculateCoordinates(4, 3)
      expect(result.x).toBeCloseTo(0, 5)
      expect(result.y).toBeCloseTo(-CIRCLE_RADIUS, 5)
    })

    it('должен вернуть корректные координаты для 6 точек, индекс 0', () => {
      const result = calculateCoordinates(6, 0)
      expect(result.x).toBeCloseTo(CIRCLE_RADIUS, 5)
      expect(result.y).toBeCloseTo(0, 5)
    })

    it('должен вернуть корректные координаты для 6 точек, индекс 3', () => {
      const result = calculateCoordinates(6, 3)
      expect(result.x).toBeCloseTo(-CIRCLE_RADIUS, 5)
      expect(result.y).toBeCloseTo(0, 5)
    })

    it('должен вернуть координаты с правильной структурой объекта', () => {
      const result = calculateCoordinates(3, 0)
      expect(result).toHaveProperty('x')
      expect(result).toHaveProperty('y')
      expect(typeof result.x).toBe('number')
      expect(typeof result.y).toBe('number')
    })
  })

  // Граничные случаи
  describe('Граничные случаи', () => {
    it('должен работать с минимальным количеством точек (2)', () => {
      expect(() => calculateCoordinates(2, 0)).not.toThrow()
      expect(() => calculateCoordinates(2, 1)).not.toThrow()
    })

    it('должен работать с максимальным количеством точек (6)', () => {
      expect(() => calculateCoordinates(6, 0)).not.toThrow()
      expect(() => calculateCoordinates(6, 5)).not.toThrow()
    })

    it('должен работать с последним допустимым индексом для каждого количества точек', () => {
      expect(() => calculateCoordinates(2, 1)).not.toThrow()
      expect(() => calculateCoordinates(3, 2)).not.toThrow()
      expect(() => calculateCoordinates(4, 3)).not.toThrow()
      expect(() => calculateCoordinates(5, 4)).not.toThrow()
      expect(() => calculateCoordinates(6, 5)).not.toThrow()
    })
  })

  // Тесты на математическую корректность
  describe('Математическая корректность', () => {
    it('должен расположить точки на окружности заданного радиуса', () => {
      const result = calculateCoordinates(4, 1)
      const distanceFromCenter = Math.sqrt(result.x ** 2 + result.y ** 2)
      expect(distanceFromCenter).toBeCloseTo(CIRCLE_RADIUS, 5)
    })

    it('должен равномерно распределять точки по окружности', () => {
      const dotsAmount = 4
      const results = []
      for (let i = 0; i < dotsAmount; i++) {
        results.push(calculateCoordinates(dotsAmount, i))
      }

      // Проверяем, что все точки на одинаковом расстоянии от центра
      const distances = results.map((r) => Math.sqrt(r.x ** 2 + r.y ** 2))
      const firstDistance = distances[0]
      distances.forEach((distance) => {
        expect(distance).toBeCloseTo(firstDistance, 5)
      })
    })
  })
})
