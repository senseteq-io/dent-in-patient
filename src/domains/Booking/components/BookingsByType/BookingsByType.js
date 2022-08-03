import { BookingEditModal, BookingList } from 'domains/Booking/components'
import { Col, Container, Row, Text } from '@qonsoll/react-design'
import { memo, useState } from 'react'

import BOOKINGS_CONTERS from '../../__constants__/bookinsCounters'
import PropTypes from 'prop-types'
import { useBookings } from '../../../Booking/hooks/get'
import { useTranslations } from 'contexts/Translation'

const {
  FUTURE_BOOKINGS_COUNTER,
  PASSED_BOOKINGS_COUNTER,
  CANCELED_BOOKINGS_COUNTER
} = BOOKINGS_CONTERS
function BookingsByType(props) {
  const { bookingsRef, bookingTitle, bookingsCounterName } = props

  const { t } = useTranslations()

  const [bookingToEdit, setBookingToEdit] = useState(null)
  const [bookings, loading, error, next, loadMoreAvailable, bookingCounter] =
    useBookings({
      bookingsRef,
      bookingsCounterName
    })

  const handleModalCancel = () => {
    setBookingToEdit(null)
  }
  const onEditBooking = (booking) => {
    setBookingToEdit(booking)
  }

  return (
    <Container>
      <Row noGutters>
        {loading ? (
          <Col>
            <Text>{t('Loading')}</Text>
          </Col>
        ) : null}
        {!loading ? (
          <Col cw="12">
            <BookingList
              title={bookingTitle}
              hideAddCard
              bookings={bookings}
              bookingCounter={bookingCounter}
              loadMoreAvailable={loadMoreAvailable}
              next={next}
              onEditBooking={onEditBooking}
            />
          </Col>
        ) : null}
        {error ? (
          <Col>
            <Text>{JSON.stringify(error)}</Text>
          </Col>
        ) : null}

        <BookingEditModal
          booking={bookingToEdit}
          isModalVisible={!!bookingToEdit}
          handleModalCancel={handleModalCancel}
        />
      </Row>
    </Container>
  )
}

BookingsByType.propTypes = {
  bookingsRef: PropTypes.array.isRequired,
  bookingTitle: PropTypes.string.isRequired,
  bookingsCounterName: PropTypes.oneOf([
    FUTURE_BOOKINGS_COUNTER,
    PASSED_BOOKINGS_COUNTER,
    CANCELED_BOOKINGS_COUNTER
  ]).isRequired
}

export default memo(BookingsByType)
