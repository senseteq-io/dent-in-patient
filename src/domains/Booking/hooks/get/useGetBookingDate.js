import { useEffect, useMemo, useState } from 'react'

import BOOKINGS_CANCEL_TIME_LIMIT from 'domains/Booking/__constants__/bookingCancelTimeLeft'
import moment from 'moment'

const useGetBookingDate = (booking) => {
  const [disabledCancelBtn, setDisabledCancelBtn] = useState(true)
  // get current time and date
  const currentDateFormatted = useMemo(
    () => moment().format('YYYY-MM-DDTHH:mm:ss'),
    []
  )

  // get booking start/end to display inside bookingSimpleView
  const start = useMemo(() => moment(booking?.start).format('HH:mm'), [booking])
  const end = useMemo(() => moment(booking?.end).format('HH:mm'), [booking])

  // based on booking time and status split them to future/passed/canceled
  const checkBookingStatus =
    booking?.status === 'CANCELED'
      ? 'Canceled'
      : currentDateFormatted > booking?.start
      ? 'Passed'
      : 'Future'

  // based on booking time and status split them to future/passed/canceled and pass different badge color
  const changeBadgeColor =
    booking?.status === 'CANCELED'
      ? 'var(--ql-color-dark-t-lighten3)'
      : currentDateFormatted > booking?.start
      ? 'var(--ql-color-dark-t-lighten1)'
      : 'var(--ql-color-accent1)'
  //  hide cancel button based time (check if pass or cancel)
  const isCancelButtonVisible = useMemo(
    () =>
      moment(booking?.start).isAfter(moment()) &&
      booking?.status !== 'CANCELED',
    [booking]
  )

  // check if
  // get 2 vas to calc time until selected - if user can cancel or change booking (current difference is 48 hours)
  const startMoment = moment(booking?.start)
  const currentMoment = moment(currentDateFormatted)
  const check48hoursEditPossibility =
    startMoment.diff(currentMoment, 'hours') > BOOKINGS_CANCEL_TIME_LIMIT
  useEffect(() => {
    if (check48hoursEditPossibility) setDisabledCancelBtn(false)
    return null
  }, [check48hoursEditPossibility])

  return [
    disabledCancelBtn,
    start,
    end,
    checkBookingStatus,
    changeBadgeColor,
    isCancelButtonVisible
  ]
}
export default useGetBookingDate
