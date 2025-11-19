/**
 * Конфигурация SVGR loader для webpack
 *
 * Преобразует SVG файлы в React компоненты.
 * Позволяет импортировать SVG как обычные React компоненты с возможностью
 * управления их свойствами (цвет, размер и т.д.) через props.
 *
 * @returns {Object} Конфигурация @svgr/webpack loader
 *
 * @example
 * import Logo from './logo.svg'
 *
 * function App() {
 *   return <Logo width={100} height={100} fill="red" />
 * }
 */
export function buildSvgrLoader() {
  const svgrLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  }

  return svgrLoader
}
