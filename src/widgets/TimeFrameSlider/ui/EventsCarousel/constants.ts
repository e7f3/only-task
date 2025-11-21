import { Navigation } from 'swiper/modules'

import type { SwiperOptions } from 'swiper/types'

/**
 * Полная конфигурация Swiper для карусели событий
 */
export const EVENT_CAROUSEL_CONFIG: SwiperOptions = {
  modules: [Navigation],
  spaceBetween: 30,
  slidesPerView: 1.5,
  breakpoints: {
    768: {
      slidesPerView: 3.5,
    },
  },
  navigation: {
    prevEl: '.swiper-button-prev-custom',
    nextEl: '.swiper-button-next-custom',
  },
}

/**
 * Константы для GSAP анимаций
 */
export const SHOW_DURATION: gsap.TweenVars['duration'] = 0.5
export const SHOW_DELAY: gsap.TweenVars['delay'] = 0.2
export const SHOW_Y_OFFSET: gsap.TweenVars['y'] = 20
export const HIDE_DURATION: gsap.TweenVars['duration'] = 0.3
