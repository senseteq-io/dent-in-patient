import PATHS from 'pages/paths'
import firebase from 'firebase/compat/app'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { useUser } from 'domains/User/context'

const { VIPPS_LOGIN_CALLBACK } = PATHS.UNAUTHENTICATED
const PASSWORD_AUTH_PROVIDER = 'password'

const useTransformRoutesRedirectProperties = () => {
  const location = useLocation()
  const [userAuth, authLoading, authError] = useAuthState(firebase.auth())
  const { user, loading } = useUser() // uncomment this part if you need to add extra conditions based on data from the DB

  // Merge all loadings to one loading
  // Artificial loading required for the case when user is logged in but upload data from DB not started yet
  // to prevent rewriting user data
  const combinedLoading = useMemo(
    () => authLoading || loading,
    [authLoading, loading]
  )
  const usersNextBookingExist = useMemo(
    () => user?.data?.nextBooking?.id,
    [user]
  )

  // when user login for the first time with password he should update his temporary password
  // this condition help to redirect him to the appropriate page
  const isTemporaryPasswordNotResolved = useMemo(
    () =>
      getAuth()?.currentUser?.providerData?.[0]?.providerId ===
        PASSWORD_AUTH_PROVIDER && !user?.isTemporaryPasswordResolved,
    [user]
  )

  // if user on unauthenticated path but has auth record and data from DB
  // redirect him to authorized path
  const isLoggedIn = useMemo(() => userAuth && user?._id, [userAuth, user])
  const isLoggedOut = useMemo(
    () => !isLoggedIn && location.pathname !== VIPPS_LOGIN_CALLBACK,
    [isLoggedIn, location.pathname]
  )

  const isSpinVisible = useMemo(
    () => combinedLoading && location.pathname !== VIPPS_LOGIN_CALLBACK,
    [combinedLoading, location.pathname]
  )

  return {
    authError,
    usersNextBookingExist,
    isTemporaryPasswordNotResolved,
    isLoggedIn,
    isLoggedOut,
    isSpinVisible
  }
}

export default useTransformRoutesRedirectProperties
