/**
 * Entity: TimePeriod
 * Типы данных для временных периодов и событий
 */

export interface HistoricalEvent {
  /**
   * Год события
   */
  readonly year: number
  /**
   * Описание события
   */
  readonly description: string
}

export interface TimePeriod {
  /**
   * Уникальный идентификатор
   */
  readonly id: string
  /**
   * Год начала периода
   */
  readonly yearFrom: number
  /**
   * Год конца периода
   */
  readonly yearTo: number
  /**
   * Название категории
   */
  readonly label: string
  /**
   * События, связанные с этим периодом и категорией
   */
  readonly events: readonly HistoricalEvent[]
}
