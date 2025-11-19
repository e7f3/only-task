import { Configuration as DevServerConfiguration } from 'webpack-dev-server'

import { BuildOptions } from './types/config'

/**
 * Конфигурация webpack-dev-server для режима разработки
 *
 * Настраивает локальный сервер разработки с поддержкой:
 * - Hot Module Replacement (HMR) - горячая перезагрузка модулей
 * - History API Fallback - поддержка клиентского роутинга (SPA)
 * - Автоматическое открытие браузера
 *
 * @param {BuildOptions} options - Опции сборки
 * @param {number} options.port - Порт для запуска сервера (по умолчанию 3000)
 * @param {boolean} options.open - Автоматически открывать браузер при запуске
 * @returns {DevServerConfiguration} Конфигурация webpack-dev-server
 *
 * @example
 * // Запуск: pnpm dev
 * // Сервер будет доступен на http://localhost:3000
 */
export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  const { port, open } = options
  return {
    port,
    open,
    historyApiFallback: true,
    hot: true,
  }
}
