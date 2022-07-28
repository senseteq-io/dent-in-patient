import { BOOKINGS_FETCH_LIMIT, COLLECTIONS } from '__constants__'

import useCollection from 'hooks/useCollection'
import { useGetBookingsCounter } from 'domains/Booking/hooks/get'
import { useMemo } from 'react'
import { useUser } from 'domains/User/context'

const { BOOKINGS } = COLLECTIONS

// const ref = 'bookings'
export default function useBookings(props) {
  const { bookingsRef, additionalQuery, bookingsCounterName } = props
  const { user } = useUser()

  const computetBookingsRef = useMemo(() => {
    return user?._id
      ? {
          ref: BOOKINGS,
          limit: BOOKINGS_FETCH_LIMIT,
          where: bookingsRef,
          orderBy: ['start', 'desc']
        }
      : { ref: null }
  }, [bookingsRef, user])

  const bookingCounter = useGetBookingsCounter({
    additionalQuery,
    bookingsCounterName
  })

  const [value, loading, error, next] = useCollection(computetBookingsRef)
  const loadMoreAvailable = value?.length < bookingCounter

  return [
    value,
    loading,
    error,
    next,
    // loadingMore,
    loadMoreAvailable,
    bookingCounter
  ]
}
