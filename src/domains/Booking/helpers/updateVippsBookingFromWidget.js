import { COLLECTIONS } from '__constants__'
import firebase from 'firebase/compat/app'
import { serverTimestamp } from 'firebase/firestore'

const { BOOKINGS } = COLLECTIONS

const updateVippsBookingFromWidget = async ({
  pendingBookingId,
  clientPhone,
  userId
}) => {
  // Update status of pending booking, add user id and phone
  await firebase.firestore().collection(BOOKINGS).doc(pendingBookingId).update({
    _updatedAt: serverTimestamp(),
    _isUpdated: true,
    userId,
    isPhoneVerified: true,
    phone: clientPhone,
    status: 'AUTHORIZED'
  })
}

export default updateVippsBookingFromWidget
