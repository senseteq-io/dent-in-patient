import { COLLECTIONS } from '__constants__'
import firebase from 'firebase/compat/app'
import { serverTimestamp } from 'firebase/firestore'

const { USERS } = COLLECTIONS

/**
 * If the user's email verification status has changed, update the user's email verification status
in the database.
 * @returns None
 */
const updateEmailVerificationStatus = ({
  id,
  sessionUserEmailVerified,
  dbUserEmailVerified,
  onError
}) => {
  const firestore = firebase.firestore()
  const isEmailVerificationUpdated =
    sessionUserEmailVerified !== dbUserEmailVerified

  /* If the user has updated their email address, update the user's emailVerified field in the
  database. */
  isEmailVerificationUpdated &&
    firestore
      .collection(USERS)
      .doc(id)
      .update({
        _updatedAt: serverTimestamp(),
        emailVerified: sessionUserEmailVerified
      })
      .catch((err) => {
        onError && onError(err)
      })
}

export default updateEmailVerificationStatus
