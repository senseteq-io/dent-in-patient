import TranslationsContext from './TranslationsContext'
import { useContext } from 'react'

/**
 * @info useTranslations (24 Apr 2021) // CREATION DATE
 *
 * @comment useTranslations - Hook that using to get translation contexts object.
 *
 * @since 28 Apr 2021 ( v.0.0.3 ) // LAST-EDIT DATE
 *
 * @returns {{
        setCurrentLanguage,
        language,
        translations,
        translateLoading,
        loaded,
        languages,
        t
      }}
 */
const useTranslations = () => {
  const context = useContext(TranslationsContext)

  if (context === undefined) {
    throw new Error(
      'useTranslations must be used within a TranslationsContext.Provider'
    )
  }

  return context
}

export default useTranslations
