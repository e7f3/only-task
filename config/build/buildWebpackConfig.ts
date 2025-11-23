import webpack from 'webpack'

import { buildDevServer } from './buildDevServer'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildResolvers } from './buildResolvers'
import { BuildOptions } from './types/config'

/**
 * Главная функция сборки конфигурации webpack
 *
 * Объединяет все модули конфигурации (loaders, plugins, resolvers, devServer)
 * в единую конфигурацию webpack.
 *
 * Основные настройки:
 * - mode: режим сборки (development/production)
 * - entry: точка входа приложения (src/index.tsx)
 * - output: настройки выходных файлов с хешами для кеширования
 * - module.rules: правила обработки различных типов файлов
 * - resolve: настройки разрешения модулей
 * - plugins: плагины для расширения функциональности webpack
 * - devtool: source maps для отладки (только в dev режиме)
 * - devServer: настройки dev-сервера (только в dev режиме)
 *
 * @param {BuildOptions} options - Полные опции сборки
 * @returns {webpack.Configuration} Готовая конфигурация webpack
 *
 * @example
 * const config = buildWebpackConfig({
 *   mode: 'development',
 *   paths: { entry: 'src/index.tsx', ... },
 *   isDev: true,
 *   port: 3000,
 *   open: true,
 *   apiUrl: 'http://localhost:8000',
 *   project: 'frontend'
 * })
 */
export function buildWebpackConfig(
  options: BuildOptions
): webpack.Configuration {
  const { mode, paths, isDev } = options
  return {
    mode,
    entry: paths.entry,
    output: {
      path: paths.build,
      filename: '[name].[contenthash].js',
      clean: true,
      publicPath: '/',
    },
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    plugins: buildPlugins(options),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
    optimization: {
      splitChunks: {
        chunks: 'all', // Разделяем код на чанки для оптимизации загрузки
      },
      runtimeChunk: 'single', // Выносим рантайм webpack в отдельный файл
    },
  }
}
