import { BOOKINGS_FETCH_LIMIT, COLLECTIONS } from '__constants__'
import { Col, Container, Row, Text } from '@qonsoll/react-design'
import { memo, useMemo } from 'react'
import { useBookings, useGetBookingsCounter } from '../../../Booking/hooks/get'

import BookingList from '../BookingList'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts/Translation'

const { BOOKINGS } = COLLECTIONS
function BookingsByType(props) {
  const {
    additionalQuery,
    bookingsRef,
    bookingTitle,
    bookingsCounterName,
    bookingsBelongTo
  } = props

  const { t } = useTranslations()
  const computetBookingsRef = useMemo(() => {
    return bookingsBelongTo
      ? {
          ref: BOOKINGS,
          limit: BOOKINGS_FETCH_LIMIT,
          where: bookingsRef,
          orderBy: ['start', 'desc']
        }
      : { ref: null }
  }, [bookingsRef, bookingsBelongTo])
  const [bookings, loading, error, next] = useBookings(computetBookingsRef)
  const bookingCounter = useGetBookingsCounter({
    additionalQuery,
    bookingsCounterName
  })

  const loadMoreAvailable = bookings?.length < bookingCounter

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
  // whereProps: PropTypes.array.isRequired,
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
