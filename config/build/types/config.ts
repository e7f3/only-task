/**
 * Режим сборки приложения
 * @typedef {'development' | 'production'} BuildMode
 */
export type BuildMode = 'development' | 'production'

/**
 * Пути для конфигурации webpack
 * @interface BuildPaths
 * @property {string} entry - Точка входа приложения (src/index.tsx)
 * @property {string} build - Директория для выходных файлов сборки (dist)
 * @property {string} html - Путь к HTML шаблону (public/index.html)
 * @property {string} src - Корневая директория исходного кода (src)
 */
export interface BuildPaths {
  entry: string
  build: string
  html: string
  src: string
}

/**
 * Опции конфигурации сборки webpack
 * @interface BuildOptions
 * @property {BuildMode} mode - Режим сборки (development/production)
 * @property {BuildPaths} paths - Пути для конфигурации
 * @property {boolean} isDev - Флаг режима разработки
 * @property {number} port - Порт для dev-сервера
 * @property {boolean} open - Автоматически открывать браузер при запуске
 * @property {string} apiUrl - URL API для глобальной переменной __API__
 * @property {'frontend' | 'storybook' | 'jest'} project - Тип проекта для глобальной переменной __PROJECT__
 */
export interface BuildOptions {
  mode: BuildMode
  paths: BuildPaths
  isDev: boolean
  port: number
  open: boolean
  apiUrl: string
  project: 'frontend' | 'storybook' | 'jest'
}

/**
 * Переменные окружения, передаваемые в webpack
 * @interface BuildEnv
 * @property {BuildMode} mode - Режим сборки
 * @property {number} port - Порт для dev-сервера
 * @property {string} apiUrl - URL API
 */
export interface BuildEnv {
  mode: BuildMode
  port: number
  apiUrl: string
}
