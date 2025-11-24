/**
 * Конфигурация Stylelint для проверки CSS/SCSS кода
 *
 * Stylelint - это линтер для стилей, который помогает избежать ошибок
 * и поддерживать единообразный стиль написания CSS/SCSS.
 *
 * Используемые плагины:
 * - stylelint-config-standard-scss: базовые правила для SCSS
 * - stylelint-order: контроль порядка свойств и селекторов
 * - stylelint-semantic-groups: семантическая группировка CSS свойств
 *
 * Основные правила:
 * - selector-class-pattern: отключен (разрешены любые имена классов)
 * - order/order: упорядочивание селекторов по семантике
 * - order/properties-order: упорядочивание CSS свойств по группам
 * - declaration-empty-line-before: отключен (не требуются пустые строки)
 *
 * @example
 * // Запуск проверки:
 * pnpm lint:styles
 *
 * // Правильный порядок свойств:
 * .button {
 *   // Позиционирование
 *   position: relative;
 *   top: 0;
 *
 *   // Блочная модель
 *   display: flex;
 *   width: 100px;
 *   padding: 10px;
 *
 *   // Типографика
 *   font-size: 14px;
 *
 *   // Визуальное оформление
 *   color: blue;
 *   background: white;
 * }
 */

const {
  propertyOrdering,
  selectorOrdering,
} = require('stylelint-semantic-groups')

module.exports = {
  extends: 'stylelint-config-standard-scss',
  plugins: [
    'stylelint-order',
    '@stylistic/stylelint-plugin',
  ],
  rules: {
    '@stylistic/indentation': 2,
    'selector-class-pattern': null,
    'order/order': selectorOrdering,
    'order/properties-order': propertyOrdering,
    'declaration-empty-line-before': null,
    'no-descending-specificity': null, // Отключаем из-за конфликта с order/order
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
}
