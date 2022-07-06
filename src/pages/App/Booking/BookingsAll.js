import { Button, Container, PageWrapper, Text } from '@qonsoll/react-design'

import { BookingList } from 'domains/Booking/components'
import { COLLECTIONS } from '__constants__'
import firebase from 'firebase/compat/app'
import moment from 'moment'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useHistory } from 'react-router-dom'
import { useMemo } from 'react'
import { useTranslations } from 'contexts/Translation'
import { useUser } from 'domains/User/context'

const { BOOKINGS } = COLLECTIONS

const BookingsAll = () => {
  const history = useHistory()
  const { user, loading } = useUser()
  const { t } = useTranslations()
  const currentDateFormatted = useMemo(
    // () => moment('2022-06-10').format('YYYY-MM-DDTHH:mm:ss'),
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
          .orderBy('start', 'desc')
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
          .orderBy('start', 'desc')
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
        .orderBy('start', 'desc')
  )
  const goToNextBookingPage = () => {
    history.push('/next-booking')
  }
  const computedError =
    futureBookingError || canceledBookingError || passedBookingError
  return (
    <PageWrapper
      headingProps={{ title: 'Bookings', titleSize: 2 }}
      contentWidth={['100%', '80%', '70%', '50%', '40%']}
      action={
        <Button onClick={goToNextBookingPage}>{t('Show next booking')}</Button>
      }
      height="100%"
    >
      <Container height="100%" style={{ gap: '16px' }}>
        {loading ? <Text>Loading bookings...</Text> : null}
        {!futureBookingsLoading ? (
          <BookingList
            hideAddCard
            title={t('Active bookings')}
            bookings={clientFutureBookings}
          />
        ) : null}
        {!passedBookingsLoading ? (
          <BookingList
            hideAddCard
            title={t('Passed bookings')}
            bookings={clientPassedBookings}
          />
        ) : null}
        {!canceledBookingsLoading ? (
          <BookingList
            hideAddCard
            title={t('Canceled bookings')}
            bookings={clientCanceledBookings}
          />
        ) : null}
        {computedError ? <Text>{JSON.stringify(computedError)}</Text> : null}
      </Container>
    </PageWrapper>
  )
}

export default BookingsAll
