import { Button, Container, PageWrapper, Text } from '@qonsoll/react-design'

import { BookingList } from 'domains/Booking/components'
import { COLLECTIONS } from '__constants__'
import firebase from 'firebase/compat/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useHistory } from 'react-router-dom'
import { useTranslations } from 'contexts/Translation'
import { useUser } from 'domains/User/context'

const { BOOKINGS } = COLLECTIONS

const BookingsAll = () => {
  const history = useHistory()
  const { user, loading } = useUser()
  const { t } = useTranslations()

  const [clientBookings, bookingsLoading, error] = useCollectionData(
    user?._id &&
      firebase
        .firestore()
        .collection(BOOKINGS)
        .where('userId', '==', user?._id)
        .orderBy('start', 'desc')
  )

  const goToNextBookingPage = () => {
    history.push('/next-booking')
  }

  return (
    <PageWrapper
      headingProps={{ title: 'Bookings', titleSize: 2 }}
      contentWidth={['100%', '80%', '70%', '50%', '40%']}
      action={
        <Button onClick={goToNextBookingPage}>{t('Show next booking')}</Button>
      }
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
