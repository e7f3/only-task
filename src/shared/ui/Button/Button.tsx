import { ButtonHTMLAttributes, memo, PropsWithChildren } from 'react'
import classNames from 'classnames'
import styles from './Button.module.scss'

export type ButtonVariant = 'round' | 'regular'
export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonColorScheme = 'primary' | 'secondary'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
    /**
     * Вариант внешнего вида кнопки
     * @default 'round'
     */
    variant?: ButtonVariant
    /**
     * Размер кнопки
     * @default 'medium'
     */
    size?: ButtonSize
    /**
     * Цветовая схема
     * @default 'timeframe'
     */
    colorScheme?: ButtonColorScheme
}

/**
 * Универсальный компонент кнопки для использования в слайдерах и других элементах интерфейса.
 * Поддерживает различные варианты отображения, размеры и цветовые схемы.
 */
export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        variant = 'round',
        size = 'medium',
        colorScheme = 'primary',
        disabled,
        ...otherProps
    } = props

    const mods: Record<string, boolean | undefined> = {
        [styles[variant]]: true,
        [styles[size]]: true,
        [styles[colorScheme]]: true,
    }

    return (
        <button
            type="button"
            className={classNames(styles.button, mods, className)}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    )
})

Button.displayName = 'Button'
