import MiniCssExtractPlugin from 'mini-css-extract-plugin'

/**
 * Конфигурация CSS/SCSS loader для webpack
 * 
 * Обрабатывает файлы .css, .scss и .sass с поддержкой CSS модулей.
 * В режиме разработки использует style-loader для инъекции стилей в DOM.
 * В режиме production использует MiniCssExtractPlugin для извлечения CSS в отдельные файлы.
 * 
 * CSS модули автоматически включаются для файлов с паттерном *.module.*
 * 
 * @param {boolean} isDev - Флаг режима разработки
 * @returns {Object} Конфигурация css-loader с поддержкой SCSS и CSS модулей
 * 
 * @example
 * // Для файла Button.module.scss будут применены CSS модули
 * // Для файла global.scss CSS модули не применяются
 */
export const buildCssLoader = (isDev: boolean) => {
  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Создает <style> теги из JS строк (dev) или извлекает в файлы (prod)
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Преобразует CSS в CommonJS модули
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: /\.module\..*$/,
            localIdentName: isDev
              ? '[path][name]__[local]--[hash:base64:5]'
              : '[hash:base64:8]',
          },
        },
      },
      // Компилирует Sass в CSS
      'sass-loader',
    ],
  }

  return cssLoader
}
