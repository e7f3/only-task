import webpack from 'webpack'

import { BuildOptions } from './types/config'

/**
 * Конфигурация разрешения модулей для webpack
 *
 * Определяет, как webpack будет искать и разрешать импорты модулей.
 *
 * Настройки:
 * - extensions: автоматически разрешает указанные расширения файлов
 * - preferAbsolute: предпочитает абсолютные пути относительным
 * - modules: директории для поиска модулей
 * - mainFiles: имена файлов по умолчанию при импорте директории
 * - alias: алиасы для упрощения импортов (можно расширить)
 *
 * @param {BuildOptions} options - Опции сборки
 * @param {BuildPaths} options.paths - Пути проекта
 * @returns {webpack.ResolveOptions} Конфигурация resolve для webpack
 *
 * @example
 * // Благодаря extensions можно писать:
 * import Component from './Component' // вместо './Component.tsx'
 *
 * // Благодаря mainFiles можно писать:
 * import utils from './utils' // вместо './utils/index.ts'
 */
export function buildResolvers(options: BuildOptions): webpack.ResolveOptions {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    preferAbsolute: true,
    modules: [options.paths.src, 'node_modules'],
    mainFiles: ['index'],
    alias: {},
  }
}
