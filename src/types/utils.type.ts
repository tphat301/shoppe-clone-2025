export interface SuccessResponseApi<Data> {
  message: string
  data: Data
}
export interface ErrorResponseApi<Data> {
  message: string
  data?: Data
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: Exclude<T[P], undefined>
}
