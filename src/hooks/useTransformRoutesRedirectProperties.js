import PATHS from 'pages/paths'
import firebase from 'firebase/compat/app'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { useUser } from 'domains/User/context'

const unauthenticatedPaths = Object.values(PATHS.UNAUTHENTICATED).filter(
  (path) => path !== PATHS.UNAUTHENTICATED.VIPPS_LOGIN_CALLBACK
)

const { VIPPS_LOGIN_CALLBACK } = PATHS.UNAUTHENTICATED
const PASSWORD_AUTH_PROVIDER = 'password'

const useTransformRoutesRedirectProperties = () => {
  const location = useLocation()
  const [userAuth, authLoading, authError] = useAuthState(firebase.auth())
  const { user, loading, artificialLoading } = useUser() // uncomment this part if you need to add extra conditions based on data from the DB

  const isUnauthenticatedPath = useMemo(
    () => unauthenticatedPaths.includes(location.pathname),
    [location.pathname]
  )
  // Merge all loadings to one loading
  // Artificial loading required for the case when user is logged in but upload data from DB not started yet
  // to prevent rewriting user data
  const isLoadingCombined = useMemo(
    () => authLoading || artificialLoading || loading,
    [authLoading, artificialLoading, loading]
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
  const isLoggedIn = useMemo(
    () => !!isUnauthenticatedPath && userAuth && user?._id,
    [isUnauthenticatedPath, userAuth, user]
  )

  const isLoggedOut = useMemo(
    () =>
      !isUnauthenticatedPath &&
      location.pathname !== VIPPS_LOGIN_CALLBACK &&
      !userAuth &&
      !isLoadingCombined,
    [isLoadingCombined, isUnauthenticatedPath, location.pathname, userAuth]
  )

  const isSpinVisible = useMemo(
    () =>
      (authLoading || loading) && location.pathname !== VIPPS_LOGIN_CALLBACK,
    [authLoading, loading, location.pathname]
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
