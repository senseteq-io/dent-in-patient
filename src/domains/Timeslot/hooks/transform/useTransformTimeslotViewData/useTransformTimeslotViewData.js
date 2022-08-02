import moment from 'moment'
import { useMemo } from 'react'

const TIME_FORMAT = 'HH:mm'

const useTransformTimeslotViewData = (props) => {
  const { start, end, selected } = props

  const startTime = useMemo(() => moment(start).format(TIME_FORMAT), [start])
  const endTime = useMemo(() => moment(end).format(TIME_FORMAT), [end])
  const timeslotPeriod = useMemo(
    () => `${startTime} - ${endTime}`,
    [startTime, endTime]
  )
  const cardBgColor = selected
    ? 'var(--ql-color-accent1-t-lighten6)'
    : 'var(--ql-color-white)'

  return { timeslotPeriod, cardBgColor }
}
export default useTransformTimeslotViewData
