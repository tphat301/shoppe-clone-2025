import axios, { AxiosError } from 'axios'
import { httpStatusCode } from '../constants/httpStatusCode'
import config from '../constants/config'
import noImage from '../assets/images/noimage.png'
import { ErrorResponseApi } from '../types/utils.type'

export function isAxiosError<TypeError>(error: unknown): error is AxiosError<TypeError> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<UnprocessableEntityError>(
  error: unknown
): error is AxiosError<UnprocessableEntityError> {
  return isAxiosError(error) && error.response?.status === httpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === httpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<ExpiredTokenError>(error: unknown): error is AxiosError<ExpiredTokenError> {
  return (
    isAxiosUnauthorizedError<ErrorResponseApi<{ name: string; message: string }>>(error) &&
    error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
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

export const getAvatarUrl = (nameAvatar?: string) => (nameAvatar ? `${config.baseUrl}images/${nameAvatar}` : noImage)
