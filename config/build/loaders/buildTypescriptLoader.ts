/**
 * Конфигурация TypeScript loader для webpack
 * 
 * Компилирует TypeScript файлы (.ts, .tsx) в JavaScript.
 * Выполняет проверку типов во время сборки.
 * 
 * @returns {Object} Конфигурация ts-loader
 * 
 * @example
 * // Обрабатывает файлы:
 * // - Component.tsx
 * // - utils.ts
 * // - types.d.ts
 */
export function buildTypescriptLoader() {
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: '/node-modules/',
  }

  return typescriptLoader
}
