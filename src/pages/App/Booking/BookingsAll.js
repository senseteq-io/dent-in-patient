import { Button, Container, PageWrapper } from '@qonsoll/react-design'
import { STATUSES, TIME } from '__constants__'

import { BookingsByType } from '../../../domains/Booking/components'
import moment from 'moment'
// import { BookingList } from 'domains/Booking/components'
// import { useGetBookings } from '../../../domains/Booking/hooks/get'
import { useHistory } from 'react-router-dom'
import { useTranslations } from 'contexts/Translation'
import { useUser } from 'domains/User/context'

const { BOOKED, FUTURE, CANCELED, PASSED } = STATUSES
const { CURRENT_DATE_FORMAT } = TIME
// import { useUser } from 'domains/User/context'

const BookingsAll = () => {
  const history = useHistory()
  // const { loading } = useUser()
  const { t } = useTranslations()
  const { user } = useUser()
  const currentDateFormatted = moment().format(CURRENT_DATE_FORMAT)
  // const [
  //   clientFutureBookings,
  //   futureBookingsLoading,
  //   futureBookingError,
  //   clientPassedBookings,
  //   passedBookingsLoading,
  //   passedBookingError,
  //   clientCanceledBookings,
  //   canceledBookingsLoading,
  //   canceledBookingError
  // ] = useGetBookings()
  const goToNextBookingPage = () => {
    history.push('/next-booking')
  }

  const futureBookingsRef = [
    ['userId', '==', user?._id],
    ['status', 'in', [BOOKED]],
    ['start', '>=', currentDateFormatted]
  ]
  const passedBookingsRef = [
    ['userId', '==', user?._id],
    ['status', 'in', [BOOKED]],
    ['start', '<=', currentDateFormatted]
  ]
  const canceledBookingsRef = [
    ['userId', '==', user?._id],
    ['status', '==', CANCELED]
  ]

  const futureTitle = t(FUTURE)
  const passedTitle = t(PASSED)
  const canceledTitle = t(CANCELED)
  // console.log(client)
  // const computedError =
  //   futureBookingError || canceledBookingError || passedBookingError
  const additionalQuery = ['userId', '==', user?._id]

  return (
    <PageWrapper
      headingProps={{ title: t('Bookings'), titleSize: 2 }}
      contentWidth={['100%', '80%', '70%', '50%', '40%']}
      action={
        <Button onClick={goToNextBookingPage}>{t('Show next booking')}</Button>
      }
      height="100%"
    >
      <Container height="100%" style={{ gap: '16px' }}>
        <BookingsByType
          bookingsBelongTo={user}
          additionalQuery={additionalQuery}
          bookingsRef={futureBookingsRef}
          bookingTitle={futureTitle}
          bookingsCounterName="futureBookingsCounter"
        />
        <BookingsByType
          bookingsBelongTo={user}
          additionalQuery={additionalQuery}
          bookingsRef={passedBookingsRef}
          bookingTitle={passedTitle}
          bookingsCounterName="passedBookingsCounter"
        />
        <BookingsByType
          bookingsBelongTo={user}
          additionalQuery={additionalQuery}
          bookingsRef={canceledBookingsRef}
          bookingTitle={canceledTitle}
          bookingsCounterName="canceledBookingsCounter"
        />
        {/* {loading ? <Text>Loading bookings...</Text> : null}
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
        {computedError ? <Text>{JSON.stringify(computedError)}</Text> : null} */}
      </Container>
    </PageWrapper>
  )
}

export default BookingsAll
