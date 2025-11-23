import { Navigation } from 'swiper/modules'

import type { SwiperOptions } from 'swiper/types'

/**
 * Полная конфигурация Swiper для карусели событий
 */
export const EVENT_CAROUSEL_CONFIG: SwiperOptions = {
  modules: [Navigation],
  slidesPerView: 1.5,
  spaceBetween: 25,
  navigation: {
    prevEl: '.swiper-button-prev-custom',
    nextEl: '.swiper-button-next-custom',
    enabled: false,
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
      navigation: {
        enabled: true,
      },
      spaceBetween: 25,
    },
    1024: {
      slidesPerView: 3,
      navigation: {
        enabled: true,
      },
      spaceBetween: 30,
    },
    1440: {
      slidesPerView: 3,
      navigation: {
        enabled: true,
      },
      spaceBetween: 80,
    },
  },
}

/**
 * Константы для GSAP анимаций
 */
export const SHOW_DURATION: gsap.TweenVars['duration'] = 0.5
export const SHOW_DELAY: gsap.TweenVars['delay'] = 0.2
export const SHOW_Y_OFFSET: gsap.TweenVars['y'] = 20
export const HIDE_DURATION: gsap.TweenVars['duration'] = 0.3
