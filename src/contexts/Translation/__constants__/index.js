export const CURRENT_APP = process.env.REACT_APP_APPLICATION_NAME
export const DEFAULT_LANGUAGE = 'no'
export const LANGUAGES = [
  { name: 'English', shortCode: 'en', label: 'English', value: 'en' },
  { name: 'Norsk', shortCode: 'no', label: 'Norsk', value: 'no' }
]
export const TRANSLATION_LOADING_CONFIG = {
  no: 'Oversettelser lastes inn...',
  en: 'Translations is loading...'
}
