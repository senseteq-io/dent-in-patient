import { Grid } from 'antd'
import { getDateRange } from 'utils'
import { useMemo } from 'react'

const { useBreakpoint } = Grid

const useTransformEditBookingData = (props) => {
  const {
    availableTimeslots,
    availableTimeslotsLoading,
    calendarTimeslotsLoading
  } = props

  const screens = useBreakpoint()

  // Get date range of dates for horizontal calendar for 28 days from current date
  const timeslotsCalendarDays = useMemo(() => getDateRange(28), [])

  const modalBodyStyles = {
    height: 'calc(100vh - 300px)',
    display: 'flex',
    padding: '4px',
    flexDirection: 'column',
    overflowY: 'scroll'
  }

  const modalWidth = useMemo(() => {
    const modalWidthByDimension = ['40%', '50%', '60%', '80%', '100%', '100%']
    // Get active dimensions
    const dimensions = Object.entries(screens)
      .map(([key, value]) => (value ? !!key : null))
      .reverse()
    // Compute modal width by getting the bigger dimension that active and
    // get the corresponding modal width
    const widthByDimension = modalWidthByDimension[dimensions.indexOf(true)]
    return widthByDimension
  }, [screens])

  const combinedLoading = availableTimeslotsLoading || calendarTimeslotsLoading
  // Disable state for all calendar days when timeslots not fetched yet
  // and timeslots for selected date fetching is in progress
  const calendarDisableStateOnMount =
    !availableTimeslots?.length && combinedLoading
  return {
    timeslotsCalendarDays,
    modalBodyStyles,
    modalWidth,
    combinedLoading,
    calendarDisableStateOnMount
  }
}
export default useTransformEditBookingData
