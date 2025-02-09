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

export function displayRating(order: number, rating: number) {
  if (order <= rating) return '100%'
  if (order > rating && order - rating < 1) return (rating - Math.floor(rating)) * 100 + '%'
  return '0%'
}

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const nameArray = nameId.split('-i-')
  return nameArray[nameArray.length - 1]
}
