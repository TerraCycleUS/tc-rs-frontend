import { availableLanguages, defaultLanguage } from './const'

export function detectLanguage() {
  return navigator.language.slice(0, 2).toLowerCase()
}

export function loadLocales(lang) {
  const isAvailable = availableLanguages[lang]
  return import(`../../locales/${isAvailable ? lang : defaultLanguage}.json`)
}
