import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import { BuildOptions } from './types/config'

/**
 * Конфигурация webpack плагинов
 *
 * Собирает все необходимые плагины для сборки приложения.
 *
 * Плагины для всех режимов:
 * - HtmlWebpackPlugin: генерирует HTML файл и автоматически подключает скрипты
 * - MiniCssExtractPlugin: извлекает CSS в отдельные файлы с хешами для кеширования
 * - ProgressPlugin: показывает прогресс сборки в консоли
 * - DefinePlugin: определяет глобальные константы для использования в коде
 *
 * Плагины только для разработки:
 * - BundleAnalyzerPlugin: анализирует размер бандла (не открывается автоматически)
 * - ReactRefreshWebpackPlugin: обеспечивает быструю перезагрузку React компонентов
 * - HotModuleReplacementPlugin: включает горячую замену модулей (HMR)
 *
 * @param {BuildOptions} options - Опции сборки
 * @param {BuildPaths} options.paths - Пути проекта
 * @param {boolean} options.isDev - Флаг режима разработки
 * @param {string} options.apiUrl - URL API для глобальной переменной __API__
 * @param {string} options.project - Тип проекта для глобальной переменной __PROJECT__
 * @returns {webpack.WebpackPluginInstance[]} Массив плагинов webpack
 *
 * @example
 * // Глобальные константы доступны в коде:
 * if (__IS_DEV__) {
 *   console.log('Development mode')
 * }
 *
 * fetch(__API__ + '/users')
 */
export function buildPlugins({
  paths,
  isDev,
  apiUrl,
  project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  const plugins = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUrl),
      __PROJECT__: JSON.stringify(project),
    }),
  ]

  if (isDev) {
    plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: 'static',
      })
    )
    plugins.push(new ReactRefreshWebpackPlugin({ overlay: false }))
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }
  return plugins
}
