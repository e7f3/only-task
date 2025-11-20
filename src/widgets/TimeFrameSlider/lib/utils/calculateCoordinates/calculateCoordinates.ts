import {
  CIRCLE_RADIUS,
  FULL_CIRCLE_DEGREES,
  HALF_CIRCLE_DEGREES,
} from '@/widgets/TimeFrameSlider/model'

/**
 * Интерфейс для координат точки.
 */
export interface DotCoordinates {
  /**
   * X координата точки.
   */
  x: number
  /**
   * Y координата точки.
   */
  y: number
}

/**
 * Функция для вычисления координат точки на круге исходя из общего количества точек и индекса текущей точки.
 * @param {number} dotsAmount - Количество точек (от 2 до 6).
 * @param {number} dotIndex - Индекс текущей точки.
 * @returns {DotCoordinates} Координаты точки.
 */
export function calculateCoordinates(
  dotsAmount: number,
  dotIndex: number
): DotCoordinates {
  // Валидация dotsAmount
  if (dotsAmount < 2 || dotsAmount > 6) {
    throw new Error('Количество точек должно быть от 2 до 6')
  }

  // Валидация dotIndex
  if (dotIndex < 0 || dotIndex > 5) {
    throw new Error('Индекс точки должен быть от 0 до 5')
  }

  // Дополнительная проверка: dotIndex не должен превышать dotsAmount - 1
  if (dotIndex >= dotsAmount) {
    throw new Error('Индекс точки должен быть меньше количества точек')
  }

  // Угол для текущей точки (в градусах)
  const angle = (FULL_CIRCLE_DEGREES / dotsAmount) * dotIndex

  // Конвертация в радианы для тригонометрических функций
  const radian = (angle * Math.PI) / HALF_CIRCLE_DEGREES

  // Вычисление координат на круге
  const x = CIRCLE_RADIUS * Math.cos(radian)
  const y = CIRCLE_RADIUS * Math.sin(radian)

  return { x, y }
}
