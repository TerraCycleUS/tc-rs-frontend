import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from './const'

export function detectLanguage() {
  return navigator.language.slice(0, 2).toLowerCase()
}

export function loadLocales(lang) {
  const isAvailable = AVAILABLE_LANGUAGES[lang]
  return import(`../../locales/${isAvailable ? lang : DEFAULT_LANGUAGE}.json`)
}
