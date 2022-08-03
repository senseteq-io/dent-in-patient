import { COLLECTIONS } from '__constants__'
import firebase from 'firebase/compat/app'
import { serverTimestamp } from 'firebase/firestore'

const { USERS } = COLLECTIONS

/**
 * Save the user's data to the database.
 * @returns A promise that resolves to the user object.
 */
const saveUserToDB = ({
  _id,
  email,
  firstName,
  lastName,
  phoneNumber,
  avatarUrl,
  agreement,
  gdpr,
  onError
}) => {
  const firestore = firebase.firestore()
  return firestore
    .collection(USERS)
    .doc(_id)
    .set({
      _id,
      _createdBy: _id,
      _updatedBy: _id,
      _createdAt: serverTimestamp(),
      _updatedAt: serverTimestamp(),
      email,
      emailVerified: false,
      agreement,
      gdpr,
      avatarUrl,
      firstName,
      lastName,
      isPhoneValid: null,
      phone: phoneNumber || null,
      data: null,
      postalCode: null
      // role
    })
    .catch((err) => {
      onError && onError(err)
    })
}

export default saveUserToDB
