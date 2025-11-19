# Документация tsconfig.json

## Описание

Конфигурация TypeScript компилятора для проекта only-task.
Определяет параметры компиляции TypeScript кода в JavaScript.

## Основные настройки компилятора (compilerOptions)

### Выходные файлы
- **outDir**: `./dist/` - Директория для скомпилированных файлов

### Проверка типов
- **noImplicitAny**: `true` - Запрет неявного типа `any`
- **strict**: `true` - Включить все строгие проверки типов

### Модули
- **module**: `ESNext` - Использование современных ES модулей
- **target**: `es5` - Компиляция в ES5 для максимальной совместимости с браузерами
- **moduleResolution**: `node` - Разрешение модулей как в Node.js

### React и JSX
- **jsx**: `react-jsx` - Автоматический JSX transform для React 19
  - Не требует импорта React в каждом файле
  - Использует новый JSX runtime

### Совместимость
- **allowJs**: `true` - Разрешить импорт `.js` файлов в TypeScript
- **esModuleInterop**: `true` - Совместимость с CommonJS модулями
- **allowSyntheticDefaultImports**: `true` - Разрешить default импорты из модулей без default export

### Пути и алиасы
- **baseUrl**: `.` - Базовый путь для разрешения модулей
- **paths**: Настройка алиасов для импортов
  ```json
  {
    "*": ["./src/*"]
  }
  ```
  Позволяет импортировать файлы из `src` без указания полного пути

## Настройки ts-node

Специальные настройки для выполнения TypeScript файлов через ts-node (используется webpack для загрузки webpack.config.ts):

```json
{
  "compilerOptions": {
    "module": "CommonJS"
  }
}
```

## Включенные и исключенные файлы

### include
- `src` - Включить все файлы из директории src для компиляции

### exclude
- `.fttemplates/**/*` - Исключить шаблоны
- `node_modules` - Исключить зависимости
- `dist` - Исключить скомпилированные файлы

## Примеры использования

### Проверка типов
```bash
pnpm type-check
```

### Использование алиасов путей
```typescript
// Вместо:
import { Button } from '../../../components/Button'

// Можно писать:
import { Button } from 'components/Button'
```

### JSX без импорта React
```typescript
// React 19 с автоматическим JSX transform
// Не нужно импортировать React!
const App = () => {
  return <div>Hello World</div>
}
```

## Связанные файлы
- `webpack.config.ts` - использует эту конфигурацию
- `eslint.config.mjs` - проверяет TypeScript код
- `src/**/*.ts` - исходные TypeScript файлы
- `src/**/*.tsx` - исходные React компоненты
