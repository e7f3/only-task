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
    test: /\.(js|jsx|tsx|ts)$/,
    exclude: [
      /node_modules/,
      /\.test\.(ts|tsx)$/, // Исключаем тестовые файлы
      /\.spec\.(ts|tsx)$/, // Исключаем spec файлы
      /\.stories\.(ts|tsx)$/, // Исключаем Storybook файлы
    ],
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true, // Включаем кеширование для ускорения пересборки
        presets: [
          '@babel/preset-env',
          ['@babel/preset-react', { runtime: 'automatic' }], // Поддержка React 17+ (новый JSX transform)
          '@babel/preset-typescript', // Поддержка TypeScript через Babel
        ],
        plugins: [isDev && require.resolve('react-refresh/babel')].filter(
          Boolean
        ),
      },
    },
  }

  return babelLoader
}
