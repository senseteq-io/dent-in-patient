import { serverTimestamp } from 'firebase/firestore'
import firebase from 'firebase/compat/app'
import { BOOKED_STATUS } from 'domains/Booking/__constants__/bookingStatuses'
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
        status: BOOKED_STATUS,
        userId,
        phone: clientPhone ? `+${clientPhone}` : null
      })
  }
}

export default updateVippsBookingFromWidget
