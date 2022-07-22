import { Box, Text } from '@qonsoll/react-design'
import { useHandleError, useTransformRoutesRedirectProperties } from 'hooks'

import PATHS from './paths'
import PropTypes from 'prop-types'
import { Spinner } from 'components'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslations } from 'contexts/Translation'

const RoutesRedirect = ({ children }) => {
  const { t } = useTranslations()
  const history = useHistory()
  const handleError = useHandleError()
  const {
    authError,
    usersNextBookingExist,
    isLoggedIn,
    isLoggedOut,
    isSpinVisible
  } = useTransformRoutesRedirectProperties()

  // Making decision how to redirect
  useEffect(() => {
    // User logged in, already get all needed data to check if he has next booking
    // has booking in the future, we redirect to future booking page
    isLoggedIn &&
      usersNextBookingExist &&
      history.push(PATHS.CONFIG.AFTER_LOGIN_WITH_BOOKING)

    // User logged in, already get all needed data to check if he has next booking
    // and user don`t have booking in the future, we redirect to all bookings page
    isLoggedIn &&
      !usersNextBookingExist &&
      history.push(PATHS.CONFIG.AFTER_LOGIN_WITHOUT_BOOKING)
  }, [history, isLoggedIn, isLoggedOut, usersNextBookingExist])

  // Session fetching error handling
  useEffect(() => {
    authError && handleError(authError)
  }, [authError, handleError])

  return (
    <>
      {isSpinVisible ? (
        <Box
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box display="flex" alignItems="center">
            <Spinner />
            <Text type="secondary" pb="2">
              {t('Loading', 'Loading...')}
            </Text>
          </Box>
        </Box>
      ) : (
        children
      )}
    </>
  )
}

RoutesRedirect.propTypes = {
  children: PropTypes.element
}

export default RoutesRedirect
