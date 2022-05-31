import { COLLECTIONS } from '__constants__'
import firebase from 'firebase/compat/app'

const { USERS } = COLLECTIONS

/**
 * Update the gdpr field of a user document in Firestore.
 * @returns The promise of the update.
 */
const updateGDPRStatus = ({ id, gdpr, onError }) => {
  const firestore = firebase.firestore()
  return firestore
    .collection(USERS)
    .doc(id)
    .udpdate({ gdpr })
    .catch((err) => {
      onError && onError(err)
    })
}

export default updateGDPRStatus
