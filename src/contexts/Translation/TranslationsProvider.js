import { Box, Spin, Text } from '@qonsoll/react-design'
import {
  CURRENT_APP,
  DEFAULT_LANGUAGE,
  LANGUAGES,
  TRANSLATION_LOADING_CONFIG
} from '../Translation/__constants__'
import Provider, { TranslationContext } from '@qonsoll/translation'

import PropTypes from 'prop-types'
import firebase from 'firebase/compat/app'
import { spinnerWrapperProps } from './TranslationsProvider.styled'
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
              <Box {...spinnerWrapperProps}>
                <Spin />
                <Text>{loadingText}</Text>
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
