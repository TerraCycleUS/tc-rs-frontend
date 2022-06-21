export function detectLanguage() {
  return navigator.language.slice(0, 2).toLowerCase()
}

export function loadLocales(lang) {
  return import(`../../locales/${lang}.json`)
}
