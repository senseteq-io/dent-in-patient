import 'firebase/compat/database'

import { CURRENT_APP, DEFAULT_LANGUAGE, LANGUAGES } from './__constants__'
import { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import TranslationsContext from './TranslationsContext'
import firebase from 'firebase/compat/app'

const TranslationsProvider = (props) => {
  const database = firebase.database()
  const LSLang = window?.localStorage.getItem('language')
  const { children } = props

  // STATES
  const [languageSwitch, setLanguageSwitch] = useState(false)
  // State that indicates current language
  const [language, setLanguage] = useState(LSLang || DEFAULT_LANGUAGE)
  // State that indicates downloaded translations from the DB
  const [translations, setTranslations] = useState({})
  // Loading state
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // LISTENERS
  // Set initial language to the localStorage
  useEffect(() => {
    /* If the user has not set a language, set the language to the default language. */
    let isComponentMounted = true
    const setLSLanguage = () =>
      window?.localStorage.setItem('language', DEFAULT_LANGUAGE)

    if (!LSLang && isComponentMounted) setLSLanguage()

    return () => {
      isComponentMounted = false
    }
  }, [LSLang])

  // Fetching translations from the DB
  useEffect(() => {
    let isComponentMounted = true
    const ref = language && `translations/${CURRENT_APP}/${language}`

    const fetchTranslations = async () => {
      /* 1. We set the loading state to true.
      2. We get the data from the database.
      3. We set the translations state to the data we got from the database.
      4. We set the loading state to false.
      5. We set the loaded state to true.
      6. We set the language switch state to false. */
      if (ref) {
        setLoading(true)
        const snapshot = await database.ref(ref).once('value')
        const data = snapshot?.val()
        if (data && Object.keys(data).length) {
          setTranslations(data)
        }
        setLoading(false)
        setLoaded(true)
        setLanguageSwitch(false)
      }
    }

    isComponentMounted && fetchTranslations()

    return () => {
      isComponentMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [database, language])

  // Function set current language to the LS and provider state
  const setCurrentLanguage = (language) => {
    /* Setting the language of the application. */
    setLanguage(language)
    return window?.localStorage.setItem('language', language)
  }

  const t = (label, value) => {
    /* If the database is loaded, and the label is not in the database, then add the label to the
    database. */
    const DBLabel = translations && translations[label]

    if (!DBLabel && loaded) {
      LANGUAGES.forEach((lang) => {
        const ref = `translations/${CURRENT_APP}/${lang.shortCode}/${label}`
        database.ref(ref).set(value || label)
      })
    }

    return DBLabel || label
  }

  return (
    <TranslationsContext.Provider
      value={{
        setCurrentLanguage,
        language,
        translations,
        translateLoading: loading,
        loaded,
        languages: LANGUAGES,
        t,
        languageSwitch,
        setLanguageSwitch
      }}
    >
      {children}
    </TranslationsContext.Provider>
  )
}

TranslationsProvider.propTypes = {
  children: PropTypes.any
}

export default TranslationsProvider
