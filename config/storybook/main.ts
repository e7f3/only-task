import type { StorybookConfig } from '@storybook/react-webpack5'
import path from 'path'

import { buildCssLoader } from '../build/loaders/buildCssLoader'

const config: StorybookConfig = {
    stories: ['../../src/**/*.stories.@(ts|tsx)'],

    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-links',
        '@storybook/addon-webpack5-compiler-babel',
    ],

    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },

    docs: {},

    webpackFinal: async (config) => {
        // Добавление алиасов путей TypeScript
        if (config.resolve) {
            config.resolve.modules = [
                path.resolve(__dirname, '../../src'),
                'node_modules',
            ]

            config.resolve.alias = {
                ...config.resolve.alias,
                '@': path.resolve(__dirname, '../../src'),
            }

            config.resolve.extensions = [
                ...(config.resolve.extensions || []),
                '.ts',
                '.tsx',
            ]
        }

        // Добавление поддержки SCSS через buildCssLoader проекта
        config.module = config.module || {}
        config.module.rules = config.module.rules || []

        // Удаление стандартных правил CSS/SCSS из Storybook
        config.module.rules = config.module.rules.filter((rule) => {
            if (typeof rule === 'object' && rule !== null && 'test' in rule) {
                const test = rule.test
                if (test instanceof RegExp) {
                    // Удаляем правила для CSS/SCSS и SVG
                    return !(
                        test.test('.css') ||
                        test.test('.scss') ||
                        test.test('.sass') ||
                        test.test('.svg')
                    )
                }
            }
            return true
        })

        // Использование конфигурации CSS loader из проекта
        config.module.rules.push(buildCssLoader(true))

        // Добавление поддержки SVGR для SVG иконок
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })

        return config
    },

    typescript: {
        check: false,
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => {
                if (prop.parent) {
                    return !prop.parent.fileName.includes('node_modules')
                }
                return true
            },
        },
    },
}

export default config
