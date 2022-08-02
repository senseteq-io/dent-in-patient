import { BookingEditModal, BookingSimpleView } from 'domains/Booking/components'
import {
  Button,
  Card,
  Col,
  Container,
  PageWrapper,
  Row,
  Text
} from '@qonsoll/react-design'
import { useMemo, useState } from 'react'

import { Spin } from 'antd'
import { useHistory } from 'react-router-dom'
import { useTranslations } from 'contexts/Translation'
import { useUser } from 'domains/User/context'

const BookingShow = () => {
  const history = useHistory()
  const { t } = useTranslations()
  const { user, loading } = useUser()

  const [bookingToEdit, setBookingToEdit] = useState(null)

  const title = useMemo(
    () =>
      loading || user?.nextBooking
        ? 'Next booking'
        : 'You don`t have future bookings',
    [loading, user]
  )

  const goToBookings = () => {
    history.push('/bookings')
  }

  const handleModalCancel = () => {
    setBookingToEdit(null)
  }
  const onEditBooking = (booking) => {
    setBookingToEdit(booking)
  }

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
                  padding: '8px 0',
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
                <BookingSimpleView
                  booking={user?.nextBooking}
                  onEditBooking={onEditBooking}
                />
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
        <BookingEditModal
          booking={bookingToEdit}
          isModalVisible={!!bookingToEdit}
          handleModalCancel={handleModalCancel}
        />
        {/* {bookingError ? <Text>{JSON.stringify(bookingError)}</Text> : null} */}
      </Container>
    </PageWrapper>
  )
}

export default BookingShow
