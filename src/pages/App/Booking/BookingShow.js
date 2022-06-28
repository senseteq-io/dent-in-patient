import {
  Button,
  Col,
  Container,
  PageWrapper,
  Row,
  Text
} from '@qonsoll/react-design'

import { BookingNextSimpleView } from 'domains/Booking/components'
import { Spin } from 'antd'
import { useHistory } from 'react-router-dom'
import { useMemo } from 'react'
import { useTransformNextBookingData } from 'domains/Booking/hooks/transform'
import { useTranslations } from 'contexts/Translation'

const BookingShow = () => {
  const history = useHistory()
  const { t } = useTranslations()
  const [nextBookingData, bookingLoading, bookingError] =
    useTransformNextBookingData()

  const goToBookings = () => {
    history.push('/bookings')
  }
  console.log('nextBookingData', nextBookingData)
  const title = useMemo(
    () =>
      bookingLoading || nextBookingData
        ? 'Next appointment'
        : 'You don`t have future appointments',
    [bookingLoading, nextBookingData]
  )
  return (
    <PageWrapper
      alignMiddle
      headingProps={{ title: t(title), titleSize: 2, marginBottom: '32px' }}
      contentWidth={['100%', '80%', '70%', '50%', '40%']}
      height="100%"
    >
      <Container height="100%">
        {bookingLoading ? (
          <Row h="center">
            <Col cw={12}>
              <Text>{t('Loading bookings')}...</Text>
            </Col>
            <Col cw={12}>
              <Spin spinning={bookingLoading} />
            </Col>
          </Row>
        ) : null}
        {!bookingLoading && nextBookingData ? (
          // <BookingAdvancedView
          //   treatmentName={nextBookingData?.treatmentName}
          //   treatmentDuration={nextBookingData?.treatmentDuration}
          //   price={nextBookingData?.price}
          //   date={nextBookingData?.date}
          //   startTime={nextBookingData?.startTime}
          //   clinicianName={nextBookingData?.clinicianName}
          //   clinicAddress={nextBookingData?.clinicAddress}
          //   addons={nextBookingData?.addons}
          // />
          <BookingNextSimpleView
            treatmentName={nextBookingData?.treatmentName}
            treatmentDuration={nextBookingData?.treatmentDuration}
            price={nextBookingData?.price}
            date={nextBookingData?.date}
            startTime={nextBookingData?.startTime}
            endTime={nextBookingData?.endTime}
            clinicianName={nextBookingData?.clinicianName}
            clinicianTitle={nextBookingData?.clinicianTitle}
            clinicianAvatarUrl={nextBookingData?.clinicianAvatarUrl}
            clinicName={nextBookingData?.clinicName}
            clinicCity={nextBookingData?.clinicCity}
            clinicAddress={nextBookingData?.clinicAddress}
            addons={nextBookingData?.addons}
          />
        ) : null}
        <Row noGutters h="center" mt={40}>
          <Col cw={10}>
            <Button block type="primary" onClick={goToBookings}>
              {t('Go to all bookings')}
            </Button>
          </Col>
        </Row>
        {bookingError ? <Text>{JSON.stringify(bookingError)}</Text> : null}
      </Container>
    </PageWrapper>
  )
}

export default BookingShow
