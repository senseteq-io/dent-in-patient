import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Container, PageWrapper, Text } from '@qonsoll/react-design'

import { BookingList } from 'domains/Booking/components'
import firebase from 'firebase/compat/app'
import { useUser } from 'domains/User/context'
import { COLLECTIONS } from '__constants__'

const { BOOKINGS } = COLLECTIONS

const BookingsAll = () => {
  const { user, loading } = useUser()

  const [clientBookings, bookingsLoading, error] = useCollectionData(
    user?._id &&
      firebase
        .firestore()
        .collection(BOOKINGS)
        .where('userId', '==', user?._id)
        .orderBy('start', 'desc')
  )

  return (
    <PageWrapper
      headingProps={{ title: 'Bookings', titleSize: 2 }}
      contentWidth={['100%', '80%', '70%', '50%', '40%']}
      height="100%"
    >
      <Container height="100%">
        {loading ? <Text>Loading bookings...</Text> : null}
        {!bookingsLoading ? (
          <BookingList hideAddCard bookings={clientBookings} />
        ) : null}
        {error ? <Text>{JSON.stringify(error)}</Text> : null}
      </Container>
    </PageWrapper>
  )
}

export default BookingsAll
