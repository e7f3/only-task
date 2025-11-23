# Документация babel.config.json

## Описание

Конфигурация Babel для транспиляции современного JavaScript/TypeScript кода в версию, совместимую со старыми браузерами.

## Используемые пресеты

### @babel/preset-env
Автоматически определяет необходимые трансформации и полифиллы на основе целевых браузеров.

**Возможности:**
- Преобразование современного JavaScript (ES6+) в ES5
- Автоматический подбор необходимых полифиллов
- Оптимизация размера бандла

### @babel/preset-typescript
Удаляет типы TypeScript из кода, оставляя чистый JavaScript.

**Важно:** Babel не проверяет типы! Для проверки типов используется отдельная команда `pnpm type-check`.

### @babel/preset-react
Преобразует JSX синтаксис в вызовы функций React.

**Настройки:**
```json
{
  "runtime": "automatic"
}
```

**Автоматический runtime (React 19):**
- Не требует импорта React в каждом файле
- Использует новый JSX transform
- Уменьшает размер бандла

## Примеры трансформации

### JSX Transform

**До (исходный код):**
```jsx
const App = () => {
  return <div>Hello World</div>
}
```

**После (с automatic runtime):**
```javascript
import { jsx as _jsx } from 'react/jsx-runtime'

const App = () => {
  return _jsx('div', { children: 'Hello World' })
}
```

### TypeScript

**До:**
```typescript
const sum = (a: number, b: number): number => {
  return a + b
}
```

**После:**
```javascript
const sum = (a, b) => {
  return a + b
}
```

### Modern JavaScript

**До (ES6+):**
```javascript
const numbers = [1, 2, 3]
const doubled = numbers.map(n => n * 2)
const [first, ...rest] = numbers
```

**После (ES5):**
```javascript
var numbers = [1, 2, 3]
var doubled = numbers.map(function(n) { return n * 2 })
var first = numbers[0]
var rest = numbers.slice(1)
```

## Интеграция с webpack

Babel используется через `babel-loader` в webpack конфигурации:

```typescript
// config/build/loaders/buildBabelLoader.ts
{
  test: /\.(js|jsx|tsx|ts)$/,
  exclude: [
    /node_modules/,
    /\.test\.(ts|tsx)$/,    // Исключаем тестовые файлы
    /\.spec\.(ts|tsx)$/,    // Исключаем spec файлы
    /\.stories\.(ts|tsx)$/  // Исключаем Storybook файлы
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true, // Кеширование для ускорения пересборки
      presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript'  // Компиляция TypeScript через Babel
      ],
      plugins: [
        isDev && require.resolve('react-refresh/babel')
      ].filter(Boolean)
    }
  }
}
```

**Важно:** TypeScript компилируется через Babel, а не через `ts-loader`. 
Проверка типов выполняется отдельно через `pnpm type-check` (tsc --noEmit).

## React Refresh (только в dev режиме)

В режиме разработки добавляется плагин `react-refresh/babel` для горячей перезагрузки React компонентов без потери состояния.

**Преимущества:**
- Мгновенное обновление компонентов при изменении кода
- Сохранение состояния компонентов
- Сохранение позиции скролла
- Улучшенный DX (Developer Experience)

## Связанные файлы
- `webpack.config.ts` - использует babel-loader
- `config/build/loaders/buildBabelLoader.ts` - конфигурация loader
- `tsconfig.json` - конфигурация TypeScript
- `package.json` - зависимости Babel

## Зависимости

```json
{
  "@babel/core": "^7.26.0",
  "@babel/preset-env": "^7.26.0",
  "@babel/preset-react": "^7.26.0",
  "@babel/preset-typescript": "^7.26.0",
  "babel-loader": "^9.2.0"
}
```
