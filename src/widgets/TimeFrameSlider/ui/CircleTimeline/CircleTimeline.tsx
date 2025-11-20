/**
 * CircleTimeline Component
 * Круговая временная шкала с периодами
 *
 * @module CircleTimeline
 * @description Компонент отображает временные периоды на круговой диаграмме.
 * Активный период автоматически поворачивается в заданную позицию с помощью GSAP анимации.
 * Поддерживает клик по точкам для переключения периодов.
 */

import classNames from 'classnames'
import gsap from 'gsap'
import { memo, useCallback, useEffect, useMemo, useRef } from 'react'

import styles from './CircleTimeline.module.scss'
import { calculateCoordinates } from '../../lib/utils/calculateCoordinates/calculateCoordinates'
import { ANIMATION_DURATION, ANIMATION_EASE } from '../../model'

import type { TimePeriod } from '@/entities/TimePeriod'

export interface CircleTimelineProps {
  /**
   * Массив временных периодов для отображения
   */
  readonly periods: readonly TimePeriod[]

  /**
   * Индекс активного периода (0-based)
   */
  readonly activeIndex: number

  /**
   * Callback для изменения активного периода
   * @param index - Индекс выбранного периода
   */
  readonly onPeriodChange: (index: number) => void

  /**
   * Угол поворота круга в градусах
   */
  readonly rotation: number
}

/**
 * CircleTimeline - компонент круговой временной шкалы
 *
 * @component
 * @example
 * ```tsx
 * <CircleTimeline
 *   periods={HISTORICAL_PERIODS}
 *   activeIndex={0}
 *   onPeriodChange={(index) => setActiveIndex(index)}
 *   rotation={-60}
 * />
 * ```
 */
export const CircleTimeline = memo(function CircleTimeline({
  periods,
  activeIndex,
  onPeriodChange,
  rotation,
}: CircleTimelineProps) {
  // Реф для контейнера круга
  const circleRef = useRef<HTMLDivElement>(null)

  // Реф для массива точек периодов
  const pointsRef = useRef<(HTMLDivElement | null)[]>([])

  /**
   * Эффект для анимации поворота круга и контр-поворота точек
   * Запускается при изменении rotation
   */
  useEffect(() => {
    // Анимация поворота контейнера круга
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        rotation,
        duration: ANIMATION_DURATION,
        ease: ANIMATION_EASE,
      })
    }

    // Контр-поворот точек, чтобы текст оставался читаемым
    pointsRef.current.forEach((point) => {
      if (point) {
        gsap.to(point, {
          rotation: -rotation,
          duration: 0,
          ease: ANIMATION_EASE,
        })
      }
    })
  }, [rotation])

  /**
   * Мемоизированный расчет позиций точек на круге
   * Пересчитывается только при изменении количества периодов
   */
  const pointPositions = useMemo(() => {
    return periods.map((_, index, array) =>
      calculateCoordinates(array.length, index)
    )
  }, [periods])

  /**
   * Мемоизированный обработчик клика по точке
   * Предотвращает создание новой функции при каждом рендере
   */
  const handlePointClick = useCallback(
    (index: number) => {
      onPeriodChange(index)
    },
    [onPeriodChange]
  )

  return (
    <div className={styles.circleContainer} ref={circleRef}>
      {periods.map((period, index) => {
        const { x, y } = pointPositions[index]

        return (
          <div
            key={period.id}
            ref={(el) => {
              pointsRef.current[index] = el
            }}
            className={classNames(styles.point, {
              [styles.active]: index === activeIndex,
            })}
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
            onClick={() => handlePointClick(index)}
            role='button'
            tabIndex={0}
            aria-label={`Period ${index + 1}: ${period.label}`}
            aria-current={index === activeIndex ? 'true' : 'false'}
          >
            <span className={styles.label}>{index + 1}</span>
          </div>
        )
      })}
    </div>
  )
})
