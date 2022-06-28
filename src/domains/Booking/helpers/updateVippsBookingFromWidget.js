import { serverTimestamp } from 'firebase/firestore'
import firebase from 'firebase/compat/app'
import { COLLECTIONS } from '__constants__'

const { BOOKINGS } = COLLECTIONS

const updateVippsBookingFromWidget = async ({
  pendingBookingId,
  clientPhone,
  userId
}) => {
  // Update status of pending booking, add user id and phone
  if (pendingBookingId && userId) {
    await firebase
      .firestore()
      .collection(BOOKINGS)
      .doc(pendingBookingId)
      .update({
        _updatedAt: serverTimestamp(),
        _isUpdated: true,
        userId,
        isPhoneVerified: true,
        phone: clientPhone
      })
  }
}

export default updateVippsBookingFromWidget
