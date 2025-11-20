import type { Preview } from '@storybook/react'
import { StyleDecorator } from './StyleDecorator.tsx'

const preview: Preview = {
    decorators: [StyleDecorator],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            default: 'light',
            values: [
                {
                    name: 'light',
                    value: '#F4F5F9',
                },
                {
                    name: 'dark',
                    value: '#1a1a1a',
                },
            ],
        },
    },
}

export default preview
