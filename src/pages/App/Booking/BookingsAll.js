import { Button, Container, PageWrapper, Text } from '@qonsoll/react-design'

import { BookingList } from 'domains/Booking/components'
import { useGetBookings } from '../../../domains/Booking/hooks/get'
import { useHistory } from 'react-router-dom'
import { useTranslations } from 'contexts/Translation'
import { useUser } from 'domains/User/context'

const BookingsAll = () => {
  const history = useHistory()
  const { loading } = useUser()
  const { t } = useTranslations()

  const [
    clientFutureBookings,
    futureBookingsLoading,
    futureBookingError,
    clientPassedBookings,
    passedBookingsLoading,
    passedBookingError,
    clientCanceledBookings,
    canceledBookingsLoading,
    canceledBookingError
  ] = useGetBookings()
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
            title={t('Future bookings')}
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
