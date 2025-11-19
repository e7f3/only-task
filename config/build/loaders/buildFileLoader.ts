/**
 * Конфигурация file-loader для webpack
 * 
 * Обрабатывает статические файлы: изображения и шрифты.
 * Копирует файлы в директорию сборки и возвращает публичный URL.
 * 
 * Поддерживаемые форматы:
 * - Изображения: .png, .jpg, .jpeg, .gif
 * - Шрифты: .woff, .woff2
 * 
 * @returns {Object} Конфигурация file-loader
 * 
 * @example
 * import logo from './logo.png'
 * // logo будет содержать путь к файлу в сборке
 */
export function buildFileLoader() {
  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff|woff2)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  }
  return fileLoader
}
