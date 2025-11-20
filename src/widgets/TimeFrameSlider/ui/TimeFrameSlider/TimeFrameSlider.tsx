/**
 * TimeFrameSlider Component
 * Главный компонент временной шкалы с круговой диаграммой и каруселью событий
 */

import gsap from 'gsap'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { HISTORICAL_PERIODS } from '@/entities/TimePeriod'
import ChevronSvg from '@/shared/assets/chevron--left.svg'
import { Button } from '@/shared/ui/Button'

import { ACTIVE_POSITION_ANGLE } from './constants'
import styles from './TimeFrameSlider.module.scss'
import { CircleTimeline } from '../CircleTimeline/CircleTimeline'
import { EventsCarousel } from '../EventsCarousel/EventsCarousel'

/**
 * Компонент временной шкалы с интерактивной круговой диаграммой
 *
 * Отображает исторические периоды на круговой диаграмме с возможностью
 * переключения между ними. Для каждого периода показывается карусель событий.
 * Центральные даты анимируются при смене периода с помощью GSAP.
 *
 * @example
 * ```tsx
 * <TimeFrameSlider />
 * ```
 */
export const TimeFrameSlider = memo(() => {
  const [activePeriod, setActivePeriod] = useState(0)
  const [rotation, setRotation] = useState(0)
  const prevRotation = useRef(0)
  const startYearRef = useRef<HTMLSpanElement>(null)
  const endYearRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Мемоизированные константы
  const totalPeriods = useMemo(() => HISTORICAL_PERIODS.length, [])
  const anglePerPoint = useMemo(() => 360 / totalPeriods, [totalPeriods])

  // Текущий период
  const currentPeriod = useMemo(
    () => HISTORICAL_PERIODS[activePeriod],
    [activePeriod]
  )

  /**
   * Расчет поворота при изменении активного периода
   * Использует кратчайший путь для анимации
   */
  useEffect(() => {
    const targetRotation = ACTIVE_POSITION_ANGLE - activePeriod * anglePerPoint
    const current = prevRotation.current
    const adjustedTarget =
      targetRotation - 360 * Math.round((targetRotation - current) / 360)

    setRotation(adjustedTarget)
    prevRotation.current = adjustedTarget
  }, [activePeriod, anglePerPoint])

  /**
   * Анимация центральных дат с использованием GSAP
   * Плавно изменяет числа при смене периода
   */
  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      if (startYearRef.current) {
        gsap.to(startYearRef.current, {
          innerText: currentPeriod.yearFrom,
          snap: { innerText: 1 },
          duration: 1,
          ease: 'power2.inOut',
        })
      }

      if (endYearRef.current) {
        gsap.to(endYearRef.current, {
          innerText: currentPeriod.yearTo,
          snap: { innerText: 1 },
          duration: 1,
          ease: 'power2.inOut',
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [currentPeriod.yearFrom, currentPeriod.yearTo])

  /**
   * Переключение на предыдущий период
   * Использует циклическую навигацию
   */
  const handlePrev = useCallback(() => {
    setActivePeriod((prev) => (prev - 1 + totalPeriods) % totalPeriods)
  }, [totalPeriods])

  /**
   * Переключение на следующий период
   * Использует циклическую навигацию
   */
  const handleNext = useCallback(() => {
    setActivePeriod((prev) => (prev + 1) % totalPeriods)
  }, [totalPeriods])

  return (
    <div className={styles.container} ref={containerRef}>
      <h1 className={styles.title}>Исторические даты</h1>

      <div className={styles.content}>
        <div className={styles.centerDate}>
          <span ref={startYearRef}>{currentPeriod.yearFrom}</span>
          <span ref={endYearRef}>{currentPeriod.yearTo}</span>
        </div>

        <div className={styles.periodLabel}>{currentPeriod.label}</div>

        <CircleTimeline
          periods={HISTORICAL_PERIODS}
          activeIndex={activePeriod}
          onPeriodChange={setActivePeriod}
          rotation={rotation}
        />

        <div className={styles.controls}>
          <div className={styles.pagination}>
            {String(activePeriod + 1).padStart(2, '0')}/
            {String(totalPeriods).padStart(2, '0')}
          </div>
          <div className={styles.buttons}>
            <Button
              variant='round'
              size='medium'
              colorScheme='primary'
              onClick={handlePrev}
              aria-label='Предыдущий период'
            >
              <ChevronSvg width={6.25} height={12.5} stroke='#42567A' />
            </Button>
            <Button
              variant='round'
              size='medium'
              colorScheme='primary'
              onClick={handleNext}
              aria-label='Следующий период'
            >
              <ChevronSvg
                width={6.25}
                height={12.5}
                stroke='#42567A'
                className={styles.rotated}
              />
            </Button>
          </div>
        </div>
      </div>

      <EventsCarousel events={currentPeriod.events} visible />
    </div>
  )
})

TimeFrameSlider.displayName = 'TimeFrameSlider'
