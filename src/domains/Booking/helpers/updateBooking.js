import {
  collection,
  getDocs,
  query,
  serverTimestamp,
  where
} from 'firebase/firestore'
import firestore from 'services/firebase/firestore'
import firebase from 'firebase/compat/app'
import { BOOKED_STATUS } from 'domains/Booking/__constants__/bookingStatuses'
import { COLLECTIONS } from '__constants__'

const { BOOKINGS } = COLLECTIONS

const updateBooking = async ({ vippsStateCode, clientPhone, userId }) => {
  // Get booking with vipps state code
  const lastVippsAuthBookingsSnapshots = await getDocs(
    query(
      collection(firestore, BOOKINGS),
      where('vippsStateCode', '==', vippsStateCode)
    )
  )
  const pendingBookings = lastVippsAuthBookingsSnapshots?.docs?.map((doc) =>
    doc.data()
  )
  // Get id of pending booking with appropriate vipps state code from widget
  const pendingBookingId = pendingBookings?.[0]?._id

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
        phone: clientPhone ? `${clientPhone}` : null
      })
  }
}

export default updateBooking
