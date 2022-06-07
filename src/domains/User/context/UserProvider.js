import 'firebase/compat/firestore'

import { useGDPRStatus, useSessionActions } from 'domains/Session/hooks'

import PropTypes from 'prop-types'
import UserContext from './UserContext'
import firebase from 'firebase/compat/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { useEffect } from 'react'
import { useHandleError } from 'hooks'

const UserProvider = ({ children }) => {
  /* The above code is a function that takes in a callback function as an argument.
  The callback function is then called with the error as an argument. */
  const handleError = useHandleError()

  /* Using the useGDPRStatus hook to get the GDPR status of the user. */
  const gdpr = useGDPRStatus()

  /* Using the useAuthState hook to get the user from the firebase auth state. */
  const [user] = useAuthState(firebase.auth())

  /* If the user is logged in, fetch the user's data from Firestore. */
  const [value, loading, error] = useDocumentDataOnce(
    user && firebase.firestore().collection('users').doc(user?.uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  // Session methods
  const {
    updateEmailVerificationStatus,
    saveUserToDB,
    getLastSessionFromLocalStorage,
    setSessionToLocalStorage,
    updateGDPRStatus
  } = useSessionActions()

  // Initial user saving to the DB
  useEffect(() => {
    // Check if there are user data in the DB
    const isNoUserDataInDB = user && !value && !loading

    /* If there is no user data in the database, save the user data to the database. */
    isNoUserDataInDB &&
      saveUserToDB({
        _id: user.uid,
        email: user.email,
        avatarUrl: user.photoURL,
        agreement: true,
        gdpr,
        onError: handleError
      })
  }, [saveUserToDB, handleError, user, value, loading, gdpr])

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
      lastSession?.email !== user?.email &&
        /* Set the session to the user's local storage. */
        setSessionToLocalStorage({
          email: user.email,
          avatarUrl: user.photoURL,
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
        data: value,
        loading: loading
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = { children: PropTypes.node }

export default UserProvider
