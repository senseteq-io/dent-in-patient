import {
  Button,
  Card,
  Col,
  Container,
  PageWrapper,
  Row,
  Text
} from '@qonsoll/react-design'

import { BookingSimpleView } from 'domains/Booking/components'
// import { BOOKED_STATUS } from 'domains/Booking/__constants__/bookingStatuses'
// import { COLLECTIONS } from '__constants__'
import { Spin } from 'antd'
// import firebase from 'firebase/compat/app'
// import moment from 'moment'
// import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import { useHistory } from 'react-router-dom'
import { useMemo } from 'react'
import { useTranslations } from 'contexts/Translation'
import { useUser } from 'domains/User/context'

// const { BOOKINGS } = COLLECTIONS
const BookingShow = () => {
  const history = useHistory()
  const { t } = useTranslations()
  const { user, loading } = useUser() // uncomment this part if you need to add extra conditions based on data from the DB

  // const [nextBookingData] = useTransformNextBookingData()

  // const currentDateFormatted = useMemo(
  //   // () => moment('2022-06-10').format('YYYY-MM-DDTHH:mm:ss'),
  //   () => moment().format('YYYY-MM-DDTHH:mm:ss'),

  //   []
  // )

  // // Get booking Data by userId and filtered by start date
  // const [nextBooking, bookingLoading, bookingError] = useCollectionDataOnce(
  //   user?._id &&
  //     firebase
  //       .firestore()
  //       .collection(BOOKINGS)
  //       .where('userId', '==', user?._id)
  //       //! 'PENDING' SHOULD BE REPLACED TO {BOOKED_STATUS} AFTER TESTING AND FIXING ALL BUGS
  //       .where('status', '==', 'PENDING')
  //       .where('start', '>=', currentDateFormatted)
  //       .orderBy('start')
  //       .limit(1)
  // )
  // // Compute client booking by getting first booking from the collection
  // const clientBooking = useMemo(() => nextBooking?.[0], [nextBooking])
  const goToBookings = () => {
    history.push('/bookings')
  }
  const title = useMemo(
    () =>
      loading || user?.nextBooking
        ? 'Next booking'
        : 'You don`t have future bookings',
    [loading, user]
  )
  return (
    <PageWrapper
      alignMiddle
      headingProps={{ title: t(title), titleSize: 2, marginBottom: '32px' }}
      contentWidth={['100%', '80%', '70%', '50%', '40%']}
      height="100%"
    >
      <Container height="100%">
        {loading ? (
          <Row h="center">
            <Col cw={12}>
              <Text>{t('Loading bookings')}...</Text>
            </Col>
            <Col cw={12}>
              <Spin spinning={loading} />
            </Col>
          </Row>
        ) : null}
        {!loading && user?.nextBooking ? (
          <Row noGutters>
            <Col>
              <Card
                bodyStyle={{
                  padding: '8px',
                  borderRadius: '12px',
                  width: '100%',
                  height: '100%'
                }}
                style={{
                  borderWidth: '1px',
                  borderColor: 'var(--ql-color-accent1-t-lighten4)',
                  // : 'transparent',
                  height: '100%',
                  alignItems: 'center',
                  display: 'flex'
                }}
                mb={32}
              >
                <BookingSimpleView booking={user?.nextBooking} />
              </Card>
            </Col>
          </Row>
        ) : null}
        <Row noGutters h="center" mt={40}>
          <Col>
            <Button block type="primary" onClick={goToBookings}>
              {t('Go to all bookings')}
            </Button>
          </Col>
        </Row>
        {/* {bookingError ? <Text>{JSON.stringify(bookingError)}</Text> : null} */}
      </Container>
    </PageWrapper>
  )
}

export default BookingShow
