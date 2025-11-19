/**
 * Главный файл конфигурации webpack
 *
 * Точка входа для webpack, которая принимает переменные окружения
 * и создает финальную конфигурацию сборки.
 *
 * Переменные окружения (передаются через CLI):
 * - mode: режим сборки ('development' | 'production')
 * - port: порт для dev-сервера (по умолчанию 3000)
 * - apiUrl: URL API (по умолчанию 'http://localhost:8000')
 *
 * @example
 * // Запуск с параметрами по умолчанию:
 * pnpm dev
 *
 * // Запуск на другом порту:
 * webpack serve --env port=8080
 *
 * // Production сборка:
 * pnpm build
 *
 * @see {@link buildWebpackConfig} для деталей конфигурации
 */

import * as path from 'path'
import webpack from 'webpack'

import { buildWebpackConfig } from './config/build/buildWebpackConfig'
import { BuildEnv } from './config/build/types/config'

export default (env: BuildEnv) => {
  const paths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    build: path.resolve(__dirname, 'dist'),
    src: path.resolve(__dirname, 'src'),
  }

  const mode = env.mode || 'development'
  const isDev = mode === 'development'
  const PORT = env.port || 3000
  const apiUrl = env.apiUrl || 'http://localhost:8000'
  const open = true
  const project = 'frontend'

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
    open,
    apiUrl,
    project,
  })

  return config
}
