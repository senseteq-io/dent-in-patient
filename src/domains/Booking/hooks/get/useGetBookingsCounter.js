import { COLLECTIONS, STATUSES, TIME } from '__constants__'
import { useEffect, useState } from 'react'

import firebase from 'firebase/compat/app'
import moment from 'moment'

const { CURRENT_DATE_FORMAT } = TIME
const { BOOKED, CANCELED } = STATUSES
const { BOOKINGS } = COLLECTIONS

const useGetBookingsCounter = ({ bookingsCounterName, bookingsRef }) => {
  const [futureBookingsCounter, setFutureBookingsCounter] = useState()
  const [passedBookingsCounter, setPassedBookingsCounter] = useState()
  const [canceledBookingsCounter, setCanceledBookingsCounter] = useState()
  const currentDateFormatted = moment().format(CURRENT_DATE_FORMAT)
  const bookingCounter = {
    passedBookingsCounter,
    canceledBookingsCounter,
    futureBookingsCounter
  }
  //get firebase collection length to display on collapse
  useEffect(() => {
    //wrap function with trtry/catch to prevent error when firebase is not initialized
    const bookings = async () => {
      try {
        // count future bookings in the collection
        const futureBookings =
          bookingsRef[0][2] &&
          (await firebase
            .firestore()
            .collection(BOOKINGS)
            .where(...bookingsRef[0])
            .where('status', 'in', [BOOKED])
            .where('start', '>=', currentDateFormatted)
            .orderBy('start', 'desc')
            .get())
        setFutureBookingsCounter(futureBookings?.size)

        // count passed bookings in the collection
        const passedBookings =
          bookingsRef[0][2] &&
          (await firebase
            .firestore()
            .collection(BOOKINGS)
            .where(...bookingsRef[0])
            .where('status', 'in', [BOOKED])
            .where('start', '<=', currentDateFormatted)
            .orderBy('start', 'desc')
            .get())
        setPassedBookingsCounter(passedBookings?.size)

        // count canceled bookings in the collection
        const canceledBookings =
          bookingsRef[0][2] &&
          (await firebase
            .firestore()
            .collection(BOOKINGS)
            .where(...bookingsRef[0])
            .where('status', '==', CANCELED)
            .orderBy('start', 'desc')
            .get())
        setCanceledBookingsCounter(canceledBookings?.size)
      } catch (e) {
        console.log(e)
      }
    }

    bookings()
  }, [bookingsRef, currentDateFormatted])
  // object to match the name of the counter and data from the collection

  // return [ futureBookingsCounter, passedBookingsCounter, canceledBookingsCounter]
  return bookingCounter[bookingsCounterName]
}
export default useGetBookingsCounter
