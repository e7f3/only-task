/**
 * Конфигурация ESLint 9 (Flat Config)
 *
 * ESLint - это инструмент для статического анализа JavaScript/TypeScript кода,
 * который помогает находить и исправлять проблемы в коде.
 *
 * Используется новый формат конфигурации (Flat Config) для ESLint 9+
 *
 * Подключенные плагины:
 * - @eslint/js: базовые правила JavaScript
 * - typescript-eslint: правила для TypeScript
 * - eslint-plugin-react: правила для React
 * - eslint-plugin-react-hooks: правила для React Hooks
 * - eslint-plugin-jsx-a11y: правила доступности для JSX
 * - eslint-plugin-import: правила для импортов
 * - eslint-plugin-jest: правила для тестов Jest
 * - eslint-plugin-prettier: интеграция с Prettier
 *
 * Глобальные переменные:
 * - __IS_DEV__: флаг режима разработки
 * - __API__: URL API
 * - __PROJECT__: тип проекта
 *
 * @example
 * // Запуск проверки:
 * pnpm lint
 *
 * // Автоматическое исправление:
 * pnpm lint --fix
 */

import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import jestPlugin from 'eslint-plugin-jest'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
    /**
     * Базовые конфигурации
     */
    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettierConfig,

    /**
     * Глобальные исключения (не проверяются линтером)
     */
    {
        ignores: [
            'dist/**',
            'node_modules/**',
            '.fttemplates/**',
            '*.config.js',
            '*.config.mjs',
            '*.config.ts',
        ],
    },

    /**
     * Основная конфигурация для всех файлов
     */
    {
        files: ['**/*.{js,mjs,cjs,ts,tsx}'],
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            'jsx-a11y': jsxA11yPlugin,
            import: importPlugin,
            jest: jestPlugin,
            prettier: prettierPlugin,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tseslint.parser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.jest,
                __IS_DEV__: 'readonly',
                __API__: 'readonly',
                __PROJECT__: 'readonly',
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: true,
                node: true,
            },
        },
        rules: {
            /**
             * Правила для импортов
             */

            /** Упорядочивание импортов по группам с алфавитной сортировкой */
            'import/order': [
                'error',
                {
                    groups: [
                        ['external', 'builtin'],
                        'internal',
                        ['sibling', 'parent'],
                        'index',
                    ],
                    pathGroups: [
                        {
                            pattern: '@react',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: '@src/**',
                            group: 'internal',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['internal', 'react'],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            'import/no-unresolved': 'off',
            'import/no-extraneous-dependencies': 'off',
            'import/extensions': 'off',
            'import/prefer-default-export': 'off',
            'import/no-import-module-exports': 'off',

            /**
             * Правила для React
             */

            /** Определение компонентов через стрелочные функции или function declaration */
            'react/function-component-definition': [
                2,
                {
                    namedComponents: ['arrow-function', 'function-declaration'],
                    unnamedComponents: ['arrow-function', 'function-expression'],
                },
            ],
            'react/jsx-filename-extension': [
                2,
                { extensions: ['.tsx', '.jsx', '.js'] },
            ],
            'react/require-default-props': 'off',
            'react/jsx-props-no-spreading': 'warn',
            'react/display-name': 'off',
            'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],
            /** Не нужен с новым JSX transform */
            'react/react-in-jsx-scope': 'off',

            /**
             * Правила для React Hooks
             */

            /** Проверка правил хуков */
            'react-hooks/rules-of-hooks': 'error',
            /** Проверка зависимостей эффектов */
            'react-hooks/exhaustive-deps': 'error',

            /**
             * Правила доступности (A11y)
             */

            'jsx-a11y/click-events-have-key-events': 'warn',
            'jsx-a11y/no-static-element-interactions': 'warn',

            /**
             * Правила для TypeScript
             */

            '@typescript-eslint/no-shadow': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-var-requires': 'warn',
            '@typescript-eslint/no-use-before-define': ['error', { enums: false }],
            '@typescript-eslint/naming-convention': [
                'warn',
                {
                    selector: 'function',
                    format: ['camelCase', 'PascalCase'],
                },
                {
                    selector: 'variable',
                    format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
                },
            ],
            '@typescript-eslint/ban-ts-comment': 'warn',

            /**
             * Общие правила JavaScript/TypeScript
             */

            /** Точки с запятой контролируются Prettier */
            semi: 'off',
            'jsx-quotes': ['error', 'prefer-single'],
            'no-shadow': 'off',
            'no-unused-vars': 'off',
            'no-underscore-dangle': 'off',
            'no-use-before-define': 'off',
            'no-param-reassign': ['warn', { props: false }],
            'max-len': [
                2,
                {
                    ignoreComments: true,
                    ignoreUrls: true,
                    code: 140,
                    ignorePattern: '^(import\\s.+\\sfrom\\s.+|\\} from)',
                },
            ],

            /**
             * Правила форматирования (Prettier)
             */

            'prettier/prettier': [
                'error',
                {
                    semi: false,
                    singleQuote: true,
                    jsxSingleQuote: true,
                    trailingComma: 'es5',
                },
            ],
        },
    },

    /**
     * Переопределение правил для JavaScript файлов
     */
    {
        files: ['**/*.js'],
        rules: {
            'consistent-return': 'off',
            '@typescript-eslint/no-var-requires': 'off',
        },
    },

    /**
     * Переопределение правил для тестов и сторибуков
     */
    {
        files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
        rules: {
            'max-len': 'off',
        },
    },
]
