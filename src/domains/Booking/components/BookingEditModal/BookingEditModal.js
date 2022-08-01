import { Box, Button, Col, NoData, Row, Title } from '@qonsoll/react-design'
import { getDateRange, sendBackendRequest } from 'utils'
import { useEffect, useState } from 'react'

import { CANCELED_STATUS } from 'domains/Booking/__constants__/bookingStatuses'
import { CalendarItem } from 'components/'
import PropTypes from 'prop-types'
import StyledModal from './BookingEditModal.styled'
import { TimeslotAdvancedView } from 'domains/Timeslot/components'
import moment from 'moment'
import { notification } from 'antd'
import { useTranslations } from '@qonsoll/translation'
import { useUser } from 'domains/User/context'

const CURRENT_DAY = moment().add(17, 'days').format('YYYY-MM-DD')
// const DENT_IN_FUNCTIONS_API_URL =
//   process.env.REACT_APP_DENT_IN_FUNCTIONS_API_URL
const BookingEditModal = (props) => {
  const { isModalVisible, handleModalCancel, booking } = props

  const { t } = useTranslations()
  const { user } = useUser()
  const [availableTimeslots, setAvailableTimeslots] = useState([])
  // const [calendarTimeslots, setCalendarTimeslots] = useState([])
  const [selectedDate, setSelectedDate] = useState(CURRENT_DAY)
  const [selectedTimeslot, setSelectedTimeslot] = useState(null)
  const [editBookingLoading, setEditBookingLoading] = useState(false)
  const timeslotsCalendarDays = getDateRange(28)

  useEffect(() => {
    const fetchAvailableTimeslots = async () => {
      const response = await sendBackendRequest({
        endpoint: `/timeslots/treatments/${booking?.treatmentId}?date=${selectedDate}&duration=1&clinicId=${booking?.clinicId}&clinicianId=${booking?.clinicianId}`,
        method: 'GET',
        errorDescription: t('Could not fetch available timeslots')
      })

      // As we fetch timeslots for 1 day, it always returns an array with 1 element
      setAvailableTimeslots(response?.data?.timeslots?.[0]?.timeslots)
    }

    if (isModalVisible && selectedDate) fetchAvailableTimeslots()
  }, [booking, isModalVisible, selectedDate, t])

  // useEffect(() => {
  //   const fetchCalendarTimeslots = async () => {
  //     const fetchDates = [0, 1, 2, 3].map((day) =>
  //       moment()
  //         .add(day * 7, 'days')
  //         .format('YYYY-MM-DD')
  //     )
  //     const timeslotsWithoutAdditionalDataFetchUrl = `${DENT_IN_FUNCTIONS_API_URL}/timeslots/treatments/${booking?.treatmentId}/light`

  //     // const calendarTimeslotsResponse = await sendBackendRequest({
  //     //   endpoint: `/timeslots/treatments/${booking?.treatmentId}?date=${selectedDate}&duration=1&clinicId=${booking?.clinicId}&clinicianId=${booking?.clinicianId}`,
  //     //   method: 'GET',
  //     //   errorDescription: t('Could not fetch available timeslots')
  //     // })
  //     // As we fetch timeslots for 1 day, it always returns an array with 1 element
  //     // setCalendarTimeslots()
  //   }

  //   if (isModalVisible && selectedDate) fetchCalendarTimeslots()
  // }, [booking, isModalVisible, selectedDate, t])

  const handleBookingEdit = async () => {
    setEditBookingLoading(true)
    const cancelResponse = await sendBackendRequest({
      endpoint: `/bookings/${booking?._id}`,
      method: 'DELETE',
      errorDescription: t('Could not cancel booking')
    })
    if (cancelResponse?.booking === CANCELED_STATUS) {
      const bookingData = {
        price: booking.price,
        patient: {
          firstName: user?.firstName,
          lastName: user?.lastName,
          postalCode: user?.postalCode,
          email: user?.email,
          phone: user?.phone,
          personalNumber: {
            year: 1981,
            month: 1,
            day: 22,
            extraDigits: 31939
          }
        },
        timeslot: {
          start: selectedTimeslot?.start,
          end: selectedTimeslot?.end,
          clinicId: booking?.clinicId,
          clinicianId: booking?.clinicianId,
          treatmentId: booking?.treatmentId,
          addons: booking?.addons
        }
      }

      const bookingResponse = await sendBackendRequest({
        endpoint: `/bookings`,
        method: 'POST',
        body: bookingData,
        errorDescription: t('Could not create booking')
      })

      if (bookingResponse?.data?.booking?._id) {
        notification.success({
          message: 'Success',
          description: 'Booking was changed successfully'
        })
      } else {
        notification.error({
          message: 'Error',
          description: 'Server responded with 404, cannot complete operation'
        })
      }
    }
    setEditBookingLoading(false)
    handleModalCancel()
  }

  const handleTimeslotSelect = (timeslotData) => {
    setSelectedTimeslot(timeslotData)
  }

  return (
    <StyledModal
      centered
      visible={isModalVisible}
      closable={false}
      width="40%"
      title={<Title variant="h3">{t('Change booking time')}</Title>}
      bodyStyle={{
        height: 'calc(100vh - 200px)'
      }}
      okText={t('Save')}
      okButtonProps={{
        loading: editBookingLoading,
        disabled: !selectedTimeslot
      }}
      onOk={handleBookingEdit}
      onCancel={handleModalCancel}
      footer={null}
    >
      <Row overflowX="auto" flexDirection="row" mx={16} noGutters>
        <Col cw="auto" flexDirection="row">
          {timeslotsCalendarDays?.map((day, index) => (
            <CalendarItem
              index={index}
              key={`${day.date}${index}`}
              name={day?.weekday}
              number={day?.day}
              selected={day?.date === selectedDate}
              disabled={false}
              monthName={day?.monthName}
              onClick={() => setSelectedDate(day.date)}
              selectedDate={selectedDate}
            />
          ))}
        </Col>
      </Row>

      {availableTimeslots?.length ? (
        <Row
          pt={24}
          flexDirection="row"
          h={availableTimeslots?.length ? 'left' : 'center'}
          v="center"
        >
          {availableTimeslots.map((timeslot) => (
            <Col key={timeslot?.start} cw={[12, 12, 12, 6, 6]} mb={12}>
              <TimeslotAdvancedView
                start={timeslot?.start}
                end={timeslot?.end}
                clinic={timeslot?.clinic}
                clinician={timeslot?.clinician}
                selected={timeslot?.start === selectedTimeslot?.start}
                handleTimeslotSelect={handleTimeslotSelect}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Box display="flex" flex={1} flexDirection="column">
          <NoData description={t('No available timeslots for chosen date')} />
        </Box>
      )}
      <Row h="right">
        <Col cw="auto">
          <Button type="text">{t('Cancel')}</Button>
        </Col>
        <Col cw="auto" pl={0}>
          <Button
            type="primary"
            disabled={!selectedTimeslot}
            loading={editBookingLoading}
          >
            {t('Save')}
          </Button>
        </Col>
      </Row>
    </StyledModal>
  )
}

BookingEditModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  handleModalCancel: PropTypes.func.isRequired,
  booking: PropTypes.object.isRequired
}

export default BookingEditModal
