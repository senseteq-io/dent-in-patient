import PATHS from 'pages/paths'
import firebase from 'firebase/compat/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useLocation } from 'react-router-dom'
import { useUser } from 'domains/User/context'

const {
  VIPPS_LOGIN_CALLBACK,
  LOGIN_WITH_EMAIL,
  ...otherUnauthenticatedRoutes
} = PATHS.UNAUTHENTICATED

const useTransformRoutesRedirectProperties = () => {
  const location = useLocation()
  const [userAuth, authLoading, authError] = useAuthState(firebase.auth())
  const { user, loading } = useUser()

  const combinedLoading = authLoading || loading
  const usersNextBookingExist = !!user?.nextBooking?._id

  const isUnauthenticatedPath = Object.values(
    otherUnauthenticatedRoutes
  ).includes(location.pathname)

  const isLoggedIn =
    !!userAuth && !!user?._id && isUnauthenticatedPath && !combinedLoading

  const isSpinVisible =
    combinedLoading && location.pathname !== VIPPS_LOGIN_CALLBACK

  return {
    authError,
    usersNextBookingExist,
    isLoggedIn,
    isSpinVisible
  }
}

export default useTransformRoutesRedirectProperties
