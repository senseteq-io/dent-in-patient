import { Button, Container, PageWrapper } from '@qonsoll/react-design'
import { STATUSES, TIME } from '__constants__'

import BOOKINGS_CONTERS from 'domains/Booking/__constants__/bookinsCounters'
import { BookingsByType } from '../../../domains/Booking/components'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { useTranslations } from 'contexts/Translation'
import { useUser } from 'domains/User/context'

const {
  FUTURE_BOOKINGS_COUNTER,
  PASSED_BOOKINGS_COUNTER,
  CANCELED_BOOKINGS_COUNTER
} = BOOKINGS_CONTERS
const { BOOKED, FUTURE, CANCELED, PASSED } = STATUSES
const { CURRENT_DATE_FORMAT } = TIME

const BookingsAll = () => {
  const history = useHistory()
  const { t } = useTranslations()
  const { user } = useUser()
  const currentDateFormatted = moment().format(CURRENT_DATE_FORMAT)

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
          bookingsRef={futureBookingsRef}
          bookingTitle={futureTitle}
          bookingsCounterName={FUTURE_BOOKINGS_COUNTER}
        />
        <BookingsByType
          bookingsBelongTo={user}
          bookingsRef={passedBookingsRef}
          bookingTitle={passedTitle}
          bookingsCounterName={PASSED_BOOKINGS_COUNTER}
        />
        <BookingsByType
          bookingsBelongTo={user}
          bookingsRef={canceledBookingsRef}
          bookingTitle={canceledTitle}
          bookingsCounterName={CANCELED_BOOKINGS_COUNTER}
        />
      </Container>
    </PageWrapper>
  )
}

export default BookingsAll
