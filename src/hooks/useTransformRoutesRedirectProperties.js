import { PASSWORD_AUTH_PROVIDER } from '__constants__/authProviders'
import PATHS from 'pages/paths'
import firebase from 'firebase/compat/app'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { useUser } from 'domains/User/context'

const { VIPPS_LOGIN_CALLBACK } = PATHS.UNAUTHENTICATED

const useTransformRoutesRedirectProperties = () => {
  const location = useLocation()
  const [userAuth, authLoading, authError] = useAuthState(firebase.auth())
  const { user, loading } = useUser()

  const combinedLoading = authLoading || loading
  const usersNextBookingExist = !!user?.nextBooking?._id

  // when user login for the first time with password he should update his temporary password
  // this condition help to redirect him to the appropriate page
  const isTemporaryPasswordNotResolved = useMemo(
    () =>
      getAuth()?.currentUser?.providerData?.[0]?.providerId ===
        PASSWORD_AUTH_PROVIDER && !user?.isTemporaryPasswordResolved,
    [user]
  )

  const isUnauthenticatedPath = Object.values(PATHS.UNAUTHENTICATED).includes(
    location.pathname
  )

  const isLoggedIn =
    !!userAuth &&
    !!user?._id &&
    location.pathname !== VIPPS_LOGIN_CALLBACK &&
    isUnauthenticatedPath

  const isSpinVisible =
    combinedLoading && location.pathname !== VIPPS_LOGIN_CALLBACK

  return {
    authError,
    usersNextBookingExist,
    isTemporaryPasswordNotResolved,
    isLoggedIn,
    isSpinVisible
  }
}

export default useTransformRoutesRedirectProperties
