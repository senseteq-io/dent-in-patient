import { serverTimestamp } from 'firebase/firestore'
import firebase from 'firebase/compat/app'
import { COLLECTIONS } from '__constants__'

const { USERS } = COLLECTIONS

const updateUserDataAfterVippsAuth = async ({ userId, userData }) => {
  firebase
    .firestore()
    .collection(USERS)
    .doc(userId)
    .update({
      _updatedAt: serverTimestamp(),
      _isUpdated: true,
      email: userData?.email,
      firstName: userData?.givenName || null,
      isPhoneValid: false,
      lastName: userData?.familyName || null,
      patientId: null,
      phone: userData?.phoneNumber || null,
      postalCode: null
    })
}

export default updateUserDataAfterVippsAuth
