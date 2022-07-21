import {
  CURRENT_APP,
  DEFAULT_LANGUAGE,
  LANGUAGES,
  TRANSLATION_LOADING_CONFIG
} from '../Translation/__constants__'
import Provider, { TranslationContext } from '@qonsoll/translation'

import { Box } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import { Spinner } from 'components'
import firebase from 'firebase/compat/app'
import { useMemo } from 'react'

const TranslationsProvider = (props) => {
  const { children } = props

  // [COMPUTED PROPERTIES]
  const db = useMemo(() => firebase.database(), [])
  const loadingText = useMemo(
    () => TRANSLATION_LOADING_CONFIG?.[localStorage.getItem('language')],
    []
  )

  return (
    <Provider
      languages={LANGUAGES}
      defaultLanguage={DEFAULT_LANGUAGE}
      currentApp={CURRENT_APP}
      db={db}
    >
      <TranslationContext.Consumer>
        {({ loaded }) => (
          <Box width="inherit" height="inherit">
            {!loaded && (
              <Box
                position="fixed"
                bg="white"
                width="100vw"
                height="100vh"
                zIndex={1000}
              >
                <Spinner text={loadingText} />
              </Box>
            )}
            {children}
          </Box>
        )}
      </TranslationContext.Consumer>
    </Provider>
  )
}

TranslationsProvider.propTypes = {
  children: PropTypes.any
}

export default TranslationsProvider
