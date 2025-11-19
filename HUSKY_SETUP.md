# Инструкция по настройке Husky

## Автоматическая установка

После клонирования репозитория выполните:

```bash
pnpm install
```

Husky автоматически установится и настроит хуки благодаря скрипту `prepare`.

## Ручная настройка (если требуется)

Если хуки не работают, выполните следующие команды:

### 1. Сделать файл хука исполняемым

```bash
chmod +x .husky/pre-push
```

### 2. Инициализировать Husky

```bash
pnpm prepare
```

## Проверка работы

Попробуйте сделать коммит и push:

```bash
git add .
git commit -m "test: проверка husky"
git push
```

Перед push должны запуститься проверки:
- Проверка типов TypeScript
- Проверка ESLint
- Проверка Stylelint

## Что делать, если проверки не проходят

### Проверка типов TypeScript

```bash
pnpm type-check
```

Исправьте ошибки типов в коде.

### Проверка ESLint

```bash
# Показать ошибки
pnpm lint

# Автоматически исправить
pnpm lint --fix
```

### Проверка Stylelint

```bash
# Показать ошибки
pnpm lint:styles

# Автоматически исправить
pnpm lint:styles --fix
```

## Пропуск проверок (крайний случай)

```bash
git push --no-verify
```

Используйте только в экстренных ситуациях!

## Отладка

Если хуки не запускаются:

1. Проверьте, что файл существует:
   ```bash
   ls -la .husky/pre-push
   ```

2. Проверьте права доступа:
   ```bash
   chmod +x .husky/pre-push
   ```

3. Проверьте содержимое:
   ```bash
   cat .husky/pre-push
   ```

4. Переустановите Husky:
   ```bash
   rm -rf .husky
   pnpm prepare
   chmod +x .husky/pre-push
   ```
