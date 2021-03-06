import moment from 'moment'
import { useGetNextBookingData } from 'domains/Booking/hooks/get'
import { useMemo } from 'react'

const useTransformNextBookingData = () => {
  const { nextBookingData, bookingLoading, bookingError } =
    useGetNextBookingData()
  const bookingDateTransformed = useMemo(
    () =>
      nextBookingData?.date &&
      moment(nextBookingData?.date).format('DD MMM YYYY'),
    [nextBookingData]
  )
  const bookingStartTime = useMemo(
    () =>
      nextBookingData?.start && moment(nextBookingData?.start).format('HH:mm'),
    [nextBookingData]
  )
  const bookingEndTime = useMemo(
    () => nextBookingData?.end && moment(nextBookingData?.end).format('HH:mm'),
    [nextBookingData]
  )
  const transformedBookingData = useMemo(
    () =>
      nextBookingData?.treatment?.name && nextBookingData?.clinician?.name
        ? {
            id: nextBookingData?._id,
            treatmentName: nextBookingData?.treatment?.name,
            treatmentDuration: nextBookingData?.treatment?.duration,
            price: nextBookingData?.price,
            date: bookingDateTransformed,
            startTime: bookingStartTime,
            endTime: bookingEndTime,
            clinicianName: nextBookingData?.clinician?.name,
            clinicianTitle: nextBookingData?.clinician?.title,
            clinicianAvatarUrl: nextBookingData?.clinician?.avatarUrl,
            clinicName: nextBookingData?.clinic?.name,
            clinicCity: nextBookingData?.clinic?.city,
            clinicAddress: nextBookingData?.clinic?.address1,
            addons: nextBookingData?.addons
          }
        : null,
    [bookingDateTransformed, bookingStartTime, bookingEndTime, nextBookingData]
  )

  return [transformedBookingData, bookingLoading, bookingError]
}

export default useTransformNextBookingData
