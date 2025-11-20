import { memo } from 'react'

import styles from './Card.module.scss'

export interface CardProps {
  /**
   * Заголовок карточки (например, год события)
   */
  readonly title: string | number
  /**
   * Описание карточки
   */
  readonly description: string
}

/**
 * Универсальная карточка для отображения информации
 *
 * Отображает заголовок и описание.
 * Используется для событий, новостей и других информационных блоков.
 *
 * @example
 * ```tsx
 * <Card title="1945" description="Окончание Второй мировой войны" />
 * <Card title="Новость" description="Текст новости" />
 * ```
 */
export const Card = memo(({ title, description }: CardProps) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  )
})

Card.displayName = 'Card'
