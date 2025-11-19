import webpack from 'webpack'

import { buildBabelLoader } from './loaders/buildBabelLoader'
import { buildCssLoader } from './loaders/buildCssLoader'
import { buildFileLoader } from './loaders/buildFileLoader'
import { buildSvgrLoader } from './loaders/buildSvgrLoader'
import { buildTypescriptLoader } from './loaders/buildTypescriptLoader'
import { BuildOptions } from './types/config'

/**
 * Собирает все webpack loaders в единый массив
 *
 * Порядок loaders важен! Webpack применяет их справа налево (снизу вверх).
 * Текущий порядок:
 * 1. fileLoader - обрабатывает изображения и шрифты
 * 2. svgrLoader - преобразует SVG в React компоненты
 * 3. babelLoader - транспилирует JS/JSX/TSX с React Refresh
 * 4. typescriptLoader - компилирует TypeScript
 * 5. cssLoader - обрабатывает CSS/SCSS с модулями
 *
 * @param {BuildOptions} options - Опции сборки
 * @param {boolean} options.isDev - Флаг режима разработки
 * @returns {webpack.RuleSetRule[]} Массив правил для webpack
 */
export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const babelLoader = buildBabelLoader(isDev)

  const fileLoader = buildFileLoader()

  const svgrLoader = buildSvgrLoader()

  const typescriptLoader = buildTypescriptLoader()

  const cssLoader = buildCssLoader(isDev)

  return [fileLoader, svgrLoader, babelLoader, typescriptLoader, cssLoader]
}
