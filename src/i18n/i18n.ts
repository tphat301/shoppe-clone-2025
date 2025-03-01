import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from '../locales/en/home.json'
import PRODUCT_EN from '../locales/en/product.json'
import HOME_VI from '../locales/vi/home.json'
import PRODUCT_VI from '../locales/vi/product.json'

export const locales = {
  vi: 'Tiếng Việt',
  en: 'Tiếng Anh'
}

export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN
  },
  vi: {
    home: HOME_VI,
    product: PRODUCT_VI
  }
}
export const defaultNS = 'home'
i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: 'vi',
  ns: ['home', 'product'],
  defaultNS,
  interpolation: {
    escapeValue: false
  }
})

export default i18n
