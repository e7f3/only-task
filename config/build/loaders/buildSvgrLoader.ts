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
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          // Replace currentColor with props
          replaceAttrValues: {
            currentColor: '{props.stroke || "currentColor"}',
          },
          // Allow width and height to be customizable
          dimensions: false,
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    // Keep viewBox for proper scaling
                    removeViewBox: false,
                  },
                },
              },
            ],
          },
        },
      },
    ],
  }

  return svgrLoader
}
