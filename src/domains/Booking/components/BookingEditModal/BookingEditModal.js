import {
  Box,
  Button,
  Col,
  NoData,
  Row,
  Spin,
  Title
} from '@qonsoll/react-design'
import {
  useGetTimeslotsForSelectedDate,
  useGetTimeslotsWithoutAdditionalData
} from 'domains/Timeslot/hooks/get'
import { useRef, useState } from 'react'

import { CalendarItem } from 'components'
import PropTypes from 'prop-types'
import StyledModal from './BookingEditModal.styled'
import { TimeslotAdvancedView } from 'domains/Timeslot/components'
import { useBookingEditActions } from 'domains/Booking/hooks/actions'
import { useHorizontalScroll } from 'hooks'
import { useTransformEditBookingData } from 'domains/Booking/hooks/transform'
import { useTranslations } from '@qonsoll/translation'

const BookingEditModal = (props) => {
  const { isModalVisible, handleModalCancel, booking } = props

  const { t } = useTranslations()
  const calendarRef = useRef()
  const onWheel = useHorizontalScroll(calendarRef)

  const [selectedDate, setSelectedDate] = useState()

  const [calendarTimeslots, calendarTimeslotsLoading] =
    useGetTimeslotsWithoutAdditionalData({
      booking,
      isModalVisible,
      selectedDate,
      setSelectedDate
    })
  const {
    editBookingLoading,
    selectedTimeslot,
    handleBookingEdit,
    handleTimeslotSelect,
    checkIsCalendarItemDisabled
  } = useBookingEditActions({
    booking,
    calendarTimeslots,
    handleModalCancel
  })
  const [availableTimeslots, availableTimeslotsLoading] =
    useGetTimeslotsForSelectedDate({
      booking,
      selectedDate,
      isModalVisible
    })

  const {
    timeslotsCalendarDays,
    modalBodyStyles,
    modalWidth,
    combinedLoading,
    calendarDisableStateOnMount
  } = useTransformEditBookingData({
    availableTimeslots,
    availableTimeslotsLoading,
    calendarTimeslotsLoading
  })

  const modalHeader = (
    <>
      <Title variant="h3">{t('Change booking time')}</Title>
      <Row
        ref={calendarRef}
        overflowX="auto"
        flexDirection="row"
        mt={3}
        noGutters
        onWheel={onWheel}
      >
        <Col cw="auto" flexDirection="row">
          {timeslotsCalendarDays?.map((day, index) => (
            <CalendarItem
              index={index}
              key={`${day.date}${index}`}
              weekday={day?.weekday}
              dayNumber={day?.day}
              monthName={day?.monthName}
              selected={day?.date === selectedDate}
              disabled={
                checkIsCalendarItemDisabled(index) ||
                calendarDisableStateOnMount
              }
              onClick={() => setSelectedDate(day.date)}
            />
          ))}
        </Col>
      </Row>
    </>
  )

  const modalFooter = (
    <Row h="right">
      <Col cw="auto" onClick={handleModalCancel}>
        <Button type="text">{t('Cancel')}</Button>
      </Col>
      <Col cw="auto" pl={0} pr={1}>
        <Button
          type="primary"
          disabled={!selectedTimeslot}
          loading={editBookingLoading}
          onClick={handleBookingEdit}
        >
          {t('Save')}
        </Button>
      </Col>
    </Row>
  )

  return (
    <StyledModal
      centered
      visible={isModalVisible}
      width={modalWidth}
      title={modalHeader}
      bodyStyle={modalBodyStyles}
      footer={modalFooter}
      onCancel={handleModalCancel}
    >
      {!combinedLoading && availableTimeslots?.length ? (
        <Row
          pt={24}
          flexDirection="row"
          h={availableTimeslots?.length ? 'left' : 'center'}
          v="center"
        >
          {availableTimeslots.map((timeslot) => (
            <Col key={timeslot?.start} cw={[12, 12, 6, 6, 6]} mb={12}>
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
        <Box
          display="flex"
          flex={1}
          flexDirection="column"
          justifyContent="center"
        >
          {combinedLoading || editBookingLoading ? (
            <Spin />
          ) : (
            <NoData description={t('No available timeslots for chosen date')} />
          )}
        </Box>
      )}
    </StyledModal>
  )
}

BookingEditModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  handleModalCancel: PropTypes.func.isRequired,
  booking: PropTypes.object
}

export default BookingEditModal
