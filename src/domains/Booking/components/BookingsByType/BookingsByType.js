import { Col, Container, Row, Text } from '@qonsoll/react-design'

import BookingList from '../BookingList'
import PropTypes from 'prop-types'
import { memo } from 'react'
import { useBookings } from '../../../Booking/hooks/get'
import { useTranslations } from 'contexts/Translation'

function BookingsByType(props) {
  const { additionalQuery, bookingsRef, bookingTitle, bookingsCounterName } =
    props

  const { t } = useTranslations()

  const [bookings, loading, error, next, loadMoreAvailable, bookingCounter] =
    useBookings({
      bookingsRef,
      additionalQuery,
      bookingsCounterName
    })

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
            />
          </Col>
        ) : null}
        {error ? (
          <Col>
            <Text>{JSON.stringify(error)}</Text>
          </Col>
        ) : null}
      </Row>
    </Container>
  )
}

BookingsByType.propTypes = {
  bookingsBelongTo: PropTypes.object.isRequired,
  bookingsRef: PropTypes.array.isRequired,
  bookingTitle: PropTypes.string.isRequired,
  additionalQuery: PropTypes.array.isRequired,
  bookingsCounterName: PropTypes.oneOf([
    'futureBookingsCounter',
    'passedBookingsCounter',
    'canceledBookingsCounter'
  ]).isRequired
}

export default memo(BookingsByType)
