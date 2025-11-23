/**
 * TimeFrameSlider Component
 * Главный компонент временной шкалы с круговой диаграммой и каруселью событий
 */

import { useGSAP } from '@gsap/react'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { HISTORICAL_PERIODS } from '@/entities/TimePeriod'
import ChevronSvg from '@/shared/assets/chevron--left.svg'
import { Button } from '@/shared/ui/Button'

import { ACTIVE_POSITION_ANGLE, GSAP_ANIMATION_CONFIG } from './constants'
import styles from './TimeFrameSlider.module.scss'
import { CircleTimeline } from '../CircleTimeline/CircleTimeline'
import { EventsCarousel } from '../EventsCarousel/EventsCarousel'

/**
 * Компонент временной шкалы с интерактивной круговой диаграммой
 *
 * Отображает исторические периоды на круговой диаграмме с возможностью
 * переключения между ними. Для каждого периода показывается карусель событий.
 * Центральные даты анимируются при смене периода с помощью GSAP useGSAP hook.
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
  const periodLabelRef = useRef<HTMLDivElement>(null)

  // Текущий период
  const currentPeriod = useMemo(
    () => HISTORICAL_PERIODS[activePeriod],
    [activePeriod]
  )

  // Мемоизированные константы
  const totalPeriods = useMemo(() => HISTORICAL_PERIODS.length, [])
  const anglePerPoint = useMemo(() => 360 / totalPeriods, [totalPeriods])

  // Рефы для предыдущих значений периода
  const prevYearFromRef = useRef(currentPeriod.yearFrom)
  const prevYearToRef = useRef(currentPeriod.yearTo)

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
   * Анимация центральных дат с использованием GSAP useGSAP hook
   * Плавно изменяет числа при смене периода
   */
  useGSAP(
    () => {
      if (startYearRef.current) {
        gsap.fromTo(
          startYearRef.current,
          {
            innerText: prevYearFromRef.current,
          },
          {
            innerText: currentPeriod.yearFrom,
            ...GSAP_ANIMATION_CONFIG,
          }
        )
      }

      if (endYearRef.current) {
        gsap.fromTo(
          endYearRef.current,
          {
            innerText: prevYearToRef.current,
          },
          {
            innerText: currentPeriod.yearTo,
            ...GSAP_ANIMATION_CONFIG,
          }
        )
      }

      prevYearFromRef.current = currentPeriod.yearFrom
      prevYearToRef.current = currentPeriod.yearTo

      if (periodLabelRef.current) {
        gsap.fromTo(
          periodLabelRef.current,
          { opacity: 0, visibility: 'hidden' },
          { opacity: 1, visibility: 'visible', duration: 1 }
        )
      }
    },
    {
      scope: containerRef,
      dependencies: [currentPeriod.yearFrom, currentPeriod.yearTo],
    }
  )

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

        <div className={styles.periodLabel} ref={periodLabelRef}>
          {currentPeriod.label}
        </div>

        <div className={styles.circleContainer}>
          <CircleTimeline
            periods={HISTORICAL_PERIODS}
            activeIndex={activePeriod}
            onPeriodChange={setActivePeriod}
            rotation={rotation}
          />
        </div>

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
              <ChevronSvg className={styles.chevronIcon} stroke='#42567A' />
            </Button>
            <Button
              variant='round'
              size='medium'
              colorScheme='primary'
              onClick={handleNext}
              aria-label='Следующий период'
            >
              <ChevronSvg
                className={classNames(styles.chevronIcon, styles.rotated)}
                stroke='#42567A'
              />
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.carouselContainer}>
        <EventsCarousel events={currentPeriod.events} visible />
      </div>

      <div className={styles.dots}>
        {HISTORICAL_PERIODS.map((_, index) => (
          <button
            key={index}
            className={classNames(styles.dot, {
              [styles.activeDot]: index === activePeriod,
            })}
            onClick={() => setActivePeriod(index)}
            aria-label={`Перейти к периоду ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
})

TimeFrameSlider.displayName = 'TimeFrameSlider'
