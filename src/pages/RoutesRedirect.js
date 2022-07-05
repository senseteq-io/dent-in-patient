import { Box, Text } from '@qonsoll/react-design'
import { useHistory, useLocation } from 'react-router-dom'

import PATHS from './paths'
import PropTypes from 'prop-types'
import { Spinner } from 'components'
import firebase from 'firebase/compat/app'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import { useHandleError } from 'hooks'
import { useTranslations } from 'contexts/Translation'
import { useUser } from 'domains/User/context' // uncomment this part if you want to use this hook

const PASSWORD_AUTH_PROVIDER = 'password'
const unauthenticatedPaths = Object.values(PATHS.UNAUTHENTICATED).filter(
  (path) => path !== PATHS.UNAUTHENTICATED.VIPPS_LOGIN_CALLBACK
)

const RoutesRedirect = ({ children }) => {
  const { t } = useTranslations()
  const history = useHistory()
  const location = useLocation()
  const handleError = useHandleError()
  const [userAuth, authLoading, error] = useAuthState(firebase.auth())
  const { user, loading, artificialLoading } = useUser() // uncomment this part if you need to add extra conditions based on data from the DB

  // Making decision how to redirect
  useEffect(() => {
    /* This code is checking if the current path is in the unauthenticatedPaths array. */
    const isUnauthenticatedPath = unauthenticatedPaths.includes(
      location.pathname
    )
    /* If the user is logged in, and the user's email is verified, then the user is logged in. */
    const usersNextBookingExist = !loading && user?.nextBooking?._id
    const isLoadingCombined = authLoading || artificialLoading || loading
    const isTemporaryPasswordNotResolved =
      getAuth()?.currentUser?.providerData?.[0]?.providerId ===
        PASSWORD_AUTH_PROVIDER && !user?.isTemporaryPasswordResolved
    const isLoggedIn =
      isUnauthenticatedPath && userAuth && !isLoadingCombined && user?._id
    const isLoggedOut = !isUnauthenticatedPath && !userAuth && !authLoading

    /* If the user is logged in, redirect to the config page. If the user is logged out, redirect to
    the logout page. If the user's email is not verified, redirect to the email confirmation page.
    */
    isLoggedIn &&
      isTemporaryPasswordNotResolved &&
      history.push(PATHS.AUTHENTICATED.SET_NEW_PASSWORD)
    isLoggedIn &&
      !isTemporaryPasswordNotResolved &&
      usersNextBookingExist &&
      history.push(PATHS.CONFIG.AFTER_LOGIN_WITH_BOOKING)
    isLoggedIn &&
      !usersNextBookingExist &&
      !isTemporaryPasswordNotResolved &&
      history.push(PATHS.CONFIG.AFTER_LOGIN_WITHOUT_BOOKING)
    isLoggedOut && history.push(PATHS.CONFIG.AFTER_LOGOUT)
  }, [
    history,
    userAuth,
    authLoading,
    location.pathname,
    user,
    loading,
    artificialLoading
  ])

  // Session fetching error handling
  useEffect(() => {
    error && handleError(error)
  }, [error, handleError])

  return (
    <>
      {authLoading || loading ? (
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
