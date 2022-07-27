import 'firebase/compat/firestore'

import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { useEffect, useMemo, useState } from 'react'
import { useGDPRStatus, useSessionActions } from 'domains/Session/hooks'

import { COLLECTIONS } from '__constants__'
import PATHS from 'pages/paths'
import PropTypes from 'prop-types'
import UserContext from './UserContext'
import firebase from 'firebase/compat/app'
import moment from 'moment'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useHandleError } from 'hooks'
import { useLocation } from 'react-router-dom'

const { BOOKINGS } = COLLECTIONS
const unauthentificatedPaths = Object.values(PATHS.UNAUTHENTICATED).filter(
  (path) => path !== PATHS.UNAUTHENTICATED.VIPPS_LOGIN_CALLBACK
)

const UserProvider = ({ children }) => {
  /* The above code is a function that takes in a callback function as an argument.
  The callback function is then called with the error as an argument. */
  const handleError = useHandleError()
  const location = useLocation()
  /* Using the useGDPRStatus hook to get the GDPR status of the user. */
  const gdpr = useGDPRStatus()
  // need this state to prevent overwriting user data when login with google
  const [userPreloading, setUserPreloading] = useState(true)

  /* Using the useAuthState hook to get the user from the firebase auth state. */
  const [user] = useAuthState(firebase.auth())

  /* If the user is logged in, fetch the user's data from Firestore. */
  const [value, loading, error] = useDocumentData(
    user && firebase.firestore().collection('users').doc(user?.uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  const currentDateFormatted = useMemo(
    // () => moment('2022-06-10').format('YYYY-MM-DDTHH:mm:ss'),
    () => moment().format('YYYY-MM-DDTHH:mm:ss'),

    []
  )

  // Get booking Data by userId and filtered by start date
  const [fetchedBookings, bookingLoading, bookingError] = useCollectionData(
    user?.uid &&
      firebase
        .firestore()
        .collection(BOOKINGS)
        .where('userId', '==', user?.uid)
        .where('status', '==', 'BOOKED')
        .where('start', '>=', currentDateFormatted)
        .orderBy('start')
        .limit(1)
  )
  // Compute client booking by getting first booking from the collection
  const nextBooking = useMemo(() => fetchedBookings?.[0], [fetchedBookings])
  const isUnauthenticatedPath = useMemo(
    () => unauthentificatedPaths.includes(location.pathname),
    [location.pathname]
  )

  // Session methods
  const {
    updateEmailVerificationStatus,
    saveUserToDB,
    getLastSessionFromLocalStorage,
    setSessionToLocalStorage,
    updateGDPRStatus
  } = useSessionActions()

  // Manage user preloading loading state to prevent user data overwrites
  useEffect(() => {
    if (user && bookingLoading) {
      setUserPreloading(false)
    }
    if (!user && !bookingLoading && isUnauthenticatedPath) {
      setUserPreloading(true)
    }
  }, [user, bookingLoading, userPreloading, isUnauthenticatedPath])

  // Initial user saving to the DB
  useEffect(() => {
    // Check if there are user data in the DB
    // when user login we have auth record in useAuth state, there is a little delay before user data fetch start
    // so in this case we have non empty user auth, no user data from DB and no loading state,
    // and condition without user preloading pass to setting user data received from auth provider that overwrite user data
    // after adding user preloading there is all ok
    const isNoUserDataInDB =
      !userPreloading && user && !value?.email && !bookingLoading
    /* If there is no user data in the database, save the user data to the database. */
    if (isNoUserDataInDB) {
      const [firstName, lastName] = user?.displayName?.split(' ') || [
        null,
        null
      ]
      saveUserToDB({
        _id: user.uid,
        email: user.email,
        avatarUrl: user.photoURL,
        agreement: true,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: user.phoneNumber || null,
        gdpr,
        onError: handleError
      })
    }
  }, [
    bookingLoading,
    gdpr,
    handleError,
    user,
    userPreloading,
    value,
    saveUserToDB
  ])

  // Updating user's email verification status
  useEffect(() => {
    // Check if data is loaded
    const isUserDataLoaded = user && value && !loading

    // Updating email verification status
    isUserDataLoaded &&
      !value.emailVerified &&
      updateEmailVerificationStatus({
        id: user.uid,
        sessionUserEmailVerified: user?.emailVerified,
        dbUserEmailVerified: value?.emailVerified,
        onError: handleError
      })
  }, [user, updateEmailVerificationStatus, value, loading, handleError])

  // Updating LS with user session info
  useEffect(() => {
    const isUserDataLoaded = user && value && !loading
    if (isUserDataLoaded) {
      const lastSession = getLastSessionFromLocalStorage()
      lastSession?.email &&
        lastSession?.email !== user?.email &&
        /* Set the session to the user's local storage. */
        setSessionToLocalStorage({
          email: user?.email,
          avatarUrl: user?.photoURL,
          provider: localStorage.getItem('lastSessionProvider')
        })
    }
  }, [
    user,
    value,
    loading,
    getLastSessionFromLocalStorage,
    setSessionToLocalStorage
  ])

  // Update GDPR status
  useEffect(() => {
    /* This is a ternary operator. It is checking if the user, value, and loading variables are all
    true. If they are, it will return true. Otherwise, it will return false. */
    const isUserDataLoaded = user && value && !loading

    /* If the user is logged in, and the user's data is loaded, and the user's data has not yet been
    updated to reflect the new GDPR status, then update the user's data to reflect the new GDPR
    status. */
    if (isUserDataLoaded && !value?.gdpr && gdpr !== value?.gdpr)
      updateGDPRStatus({ id: user?.uid, gdpr, onError: handleError })
  }, [gdpr, user, value, updateGDPRStatus, handleError, loading])

  // Handling user fetching error
  useEffect(() => {
    error && handleError(error)
  }, [error, handleError])
  return (
    <UserContext.Provider
      value={{
        user: {
          ...value,
          nextBooking,
          nextBookingLoading: loading || bookingLoading || userPreloading,
          bookingError
        },
        loading: loading || bookingLoading
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = { children: PropTypes.node }

export default UserProvider
