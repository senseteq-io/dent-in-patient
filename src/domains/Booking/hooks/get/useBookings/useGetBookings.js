import { COLLECTIONS, STATUSES, TIME } from '__constants__'

import firebase from 'firebase/compat/app'
import moment from 'moment'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const { CURRENT_DATE_FORMAT } = TIME
const { BOOKED, CANCELED } = STATUSES
const { BOOKINGS } = COLLECTIONS

const useGetBookings = ({ additionalQuery }) => {
  const currentDateFormatted = moment().format(CURRENT_DATE_FORMAT)
  const [bookings, loading, error] = useCollectionData(
    additionalQuery[2] &&
      firebase
        .firestore()
        .collection(BOOKINGS)
        .where(...additionalQuery)
        .where('status', 'in', [BOOKED])
        .where('start', '>=', currentDateFormatted)
        .orderBy('start', 'desc')
  )
  const [
    passedBookings,
    clientPassedBookingsloading,
    clientPassedBookingsError
  ] = useCollectionData(
    additionalQuery[2] &&
      firebase
        .firestore()
        .collection(BOOKINGS)
        .where(...additionalQuery)
        .where('status', 'in', [BOOKED])
        .where('start', '<=', currentDateFormatted)
        .orderBy('start', 'desc')
  )
  const [
    canceledBookings,
    clientCanceledBookingsloading,
    clientCanceledBookingsError
  ] = useCollectionData(
    additionalQuery[2] &&
      firebase
        .firestore()
        .collection(BOOKINGS)
        .where(...additionalQuery)
        .where('status', '==', CANCELED)
        .orderBy('start', 'desc')
  )

  const computedError =
    error || clientPassedBookingsError || clientCanceledBookingsError

  const computedLoading =
    loading || clientPassedBookingsloading || clientCanceledBookingsloading
  return [
    bookings,
    computedError,
    computedLoading,
    passedBookings,
    canceledBookings
  ]
}
export default useGetBookings
