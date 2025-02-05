import axios, { AxiosError } from 'axios'
import { httpStatusCode } from '../constants/httpStatusCode'

export function isAxiosError<TypeError>(error: unknown): error is AxiosError<TypeError> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntity<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === httpStatusCode.UnprocessableEntity
}

export function formatNumberCurrency(currency: number) {
  return Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocicalStyle(value: number) {
  return Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLocaleLowerCase()
}

export function discountPercent(oldPrice: number, newPrice: number) {
  return `${Math.round(((oldPrice - newPrice) / oldPrice) * 100)}%`
}
