import { COLLECTIONS } from '__constants__'
import firebase from 'firebase/compat/app'
import moment from 'moment'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useMemo } from 'react'
import { useUser } from 'domains/User/context'

const useGetBookings = () => {
  const { BOOKINGS } = COLLECTIONS
  const { user } = useUser()
  const currentDateFormatted = useMemo(
    () => moment().format('YYYY-MM-DDTHH:mm:ss'),
    []
  )
  const [clientFutureBookings, futureBookingsLoading, futureBookingError] =
    useCollectionData(
      user?._id &&
        firebase
          .firestore()
          .collection(BOOKINGS)
          .where('userId', '==', user?._id)
          .where('status', 'in', ['PENDING', 'BOOKED'])
          .where('start', '>=', currentDateFormatted)
          .orderBy('start', 'asc')
    )
  const [clientPassedBookings, passedBookingsLoading, passedBookingError] =
    useCollectionData(
      user?._id &&
        firebase
          .firestore()
          .collection(BOOKINGS)
          .where('userId', '==', user?._id)
          .where('status', 'in', ['PENDING', 'BOOKED'])
          .where('start', '<=', currentDateFormatted)
          .orderBy('start', 'asc')
    )
  const [
    clientCanceledBookings,
    canceledBookingsLoading,
    canceledBookingError
  ] = useCollectionData(
    user?._id &&
      firebase
        .firestore()
        .collection(BOOKINGS)
        .where('userId', '==', user?._id)
        .where('status', '==', 'CANCELED')
        .orderBy('start', 'asc')
  )

  return [
    clientFutureBookings,
    futureBookingsLoading,
    futureBookingError,
    clientPassedBookings,
    passedBookingsLoading,
    passedBookingError,
    clientCanceledBookings,
    canceledBookingsLoading,
    canceledBookingError
  ]
}

export default useGetBookings
