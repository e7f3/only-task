/**
 * EventsCarousel Component
 * Карусель событий с использованием Swiper
 * Отображает список исторических событий в виде слайдера
 */

import { useGSAP } from '@gsap/react'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { memo, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import ChevronSvg from '@/shared/assets/chevron--left.svg'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'

import {
  EVENT_CAROUSEL_CONFIG,
  HIDE_DURATION,
  SHOW_DELAY,
  SHOW_DURATION,
  SHOW_Y_OFFSET,
} from './constants'
import styles from './EventsCarousel.module.scss'

import type { HistoricalEvent } from '@/entities/TimePeriod'
import type { Swiper as SwiperType } from 'swiper'

export interface EventsCarouselProps {
  /**
   * Массив исторических событий для отображения
   */
  readonly events: readonly HistoricalEvent[]
  /**
   * Флаг видимости карусели (управляет анимацией появления/исчезновения)
   */
  readonly visible: boolean
}

/**
 * Компонент карусели исторических событий
 *
 * Использует Swiper для создания слайдера с кастомной навигацией.
 * Поддерживает адаптивное количество слайдов на разных размерах экрана.
 * Анимирует появление/исчезновение с помощью GSAP useGSAP hook.
 *
 * @example
 * ```tsx
 * <EventsCarousel
 * events={ HISTORICAL_PERIODS[0].events }
 * visible={ true }
 * />
 * ```
 */
export const EventsCarousel = memo(
  ({ events, visible }: EventsCarouselProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isBeginning, setIsBeginning] = useState(true)
    const [isEnd, setIsEnd] = useState(false)

    /**
     * Анимация появления/исчезновения карусели
     * Использует useGSAP hook для автоматической очистки анимаций
     */
    useGSAP(
      () => {
        if (visible) {
          gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: SHOW_Y_OFFSET },
            {
              opacity: 1,
              y: 0,
              duration: SHOW_DURATION,
              delay: SHOW_DELAY,
            }
          )
        } else {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: HIDE_DURATION,
          })
        }
      },
      { scope: containerRef, dependencies: [visible, events] }
    )

    /**
     * Обработчик инициализации Swiper
     * Устанавливает начальное состояние кнопок навигации
     */
    const handleSwiperInit = (swiper: SwiperType) => {
      setIsBeginning(swiper.isBeginning)
      setIsEnd(swiper.isEnd)
    }

    /**
     * Обработчик изменения состояния Swiper
     * Обновляет состояние кнопок навигации
     */
    const handleSlideChange = (swiper: SwiperType) => {
      setIsBeginning(swiper.isBeginning)
      setIsEnd(swiper.isEnd)
    }

    return (
      <div className={styles.container} ref={containerRef}>
        <div
          className={classNames(styles.prevButtonWrapper, {
            [styles.hidden]: isBeginning,
          })}
        >
          <Button
            variant='round'
            size='small'
            colorScheme='secondary'
            className='swiper-button-prev-custom'
            aria-label='Предыдущий слайд'
          >
            <ChevronSvg width={6} height={9} stroke='#3877EE' />
          </Button>
        </div>

        <div
          className={classNames(styles.nextButtonWrapper, {
            [styles.hidden]: isEnd,
          })}
        >
          <Button
            variant='round'
            size='small'
            colorScheme='secondary'
            className='swiper-button-next-custom'
            aria-label='Следующий слайд'
          >
            <ChevronSvg width={6} height={9} stroke='#3877EE' />
          </Button>
        </div>

        <Swiper
          {...EVENT_CAROUSEL_CONFIG}
          watchSlidesProgress
          onInit={handleSwiperInit}
          onSlideChange={handleSlideChange}
        >
          {events.map((event) => (
            <SwiperSlide
              key={`${event.year}-${event.description.slice(0, 20)}`}
            >
              <Card title={event.year} description={event.description} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  }
)

EventsCarousel.displayName = 'EventsCarousel'
