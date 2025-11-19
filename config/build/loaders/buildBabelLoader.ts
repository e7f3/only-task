/**
 * Конфигурация Babel loader для webpack
 * 
 * Обрабатывает файлы JavaScript, JSX и TSX с помощью Babel.
 * В режиме разработки включает React Refresh для горячей перезагрузки компонентов.
 * 
 * @param {boolean} isDev - Флаг режима разработки
 * @returns {Object} Конфигурация babel-loader
 * 
 * @example
 * const babelLoader = buildBabelLoader(true)
 * // Возвращает loader с React Refresh для разработки
 */
export function buildBabelLoader(isDev: boolean) {
  const babelLoader = {
    test: /\.(js|jsx|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: [isDev && require.resolve('react-refresh/babel')].filter(
          Boolean
        ),
      },
    },
  }

  return babelLoader
}
