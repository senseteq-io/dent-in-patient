import { notification } from 'antd'
import { sendBackendRequest } from 'utils'
import { useState } from 'react'
import { useTranslations } from '@qonsoll/translation'
import { useUser } from 'domains/User/context'

const useBookingEditActions = (props) => {
  const { booking, calendarTimeslots, handleModalCancel } = props

  const { user } = useUser()
  const { t } = useTranslations()

  const [editBookingLoading, setEditBookingLoading] = useState(false)
  const [selectedTimeslot, setSelectedTimeslot] = useState(null)

  const handleBookingEdit = async () => {
    setEditBookingLoading(true)
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
      await sendBackendRequest({
        endpoint: `/bookings/${booking?._id}`,
        method: 'DELETE',
        errorDescription: t('Could not cancel booking')
      })

      notification.success({
        message: 'Success',
        description: 'Booking was changed successfully'
      })
      setEditBookingLoading(false)
      handleModalCancel()
    } else {
      notification.error({
        message: 'Error',
        description: 'Server responded with 404, cannot complete operation'
      })
      setEditBookingLoading(false)
    }
  }

  const handleTimeslotSelect = (timeslotData) => {
    setSelectedTimeslot(timeslotData)
  }

  const checkIsCalendarItemDisabled = (dayIndex) =>
    !calendarTimeslots[dayIndex]?.timeslots?.length

  return {
    editBookingLoading,
    selectedTimeslot,
    handleBookingEdit,
    handleTimeslotSelect,
    checkIsCalendarItemDisabled
  }
}

export default useBookingEditActions
