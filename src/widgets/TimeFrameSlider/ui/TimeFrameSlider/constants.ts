import { Power2 } from 'gsap'

/**
 * Константы для компонента TimeFrameSlider
 */

/**
 * Угол позиции активного элемента (верхний правый угол)
 */
export const ACTIVE_POSITION_ANGLE = -60

/**
 * Конфигурация анимации для изменения значения года
 */
export const GSAP_ANIMATION_CONFIG: gsap.TweenVars = {
  snap: { innerText: 1 },
  duration: 1,
  ease: Power2.easeInOut,
} as const
