import { useEffect, useState } from 'react'

import { sendBackendRequest } from 'utils'
import { useTranslations } from '@qonsoll/translation'

const useGetTimeslotsForSelectedDate = (props) => {
  const { booking, selectedDate, isModalVisible } = props
  const [availableTimeslots, setAvailableTimeslots] = useState([])
  const [availableTimeslotsLoading, setAvailableTimeslotsLoading] =
    useState(false)
  const { t } = useTranslations()

  useEffect(() => {
    const fetchAvailableTimeslots = async () => {
      setAvailableTimeslotsLoading(true)
      const timeslotsFetchURl = `/timeslots/treatments/${booking?.treatmentId}`
      const timeslotsFetchParams = `date=${selectedDate}&duration=1&clinicId=${booking?.clinicId}&clinicianId=${booking?.clinicianId}`
      const response = await sendBackendRequest({
        endpoint: `${timeslotsFetchURl}?${timeslotsFetchParams}`,
        method: 'GET',
        errorDescription: t('Could not fetch available timeslots')
      })

      // As we fetch timeslots for 1 day, it always returns an array with 1 element
      setAvailableTimeslots(response?.data?.timeslots?.[0]?.timeslots)
      setAvailableTimeslotsLoading(false)
    }

    if (isModalVisible && selectedDate) fetchAvailableTimeslots()
  }, [booking, isModalVisible, selectedDate, t])

  return [availableTimeslots, availableTimeslotsLoading]
}

export default useGetTimeslotsForSelectedDate
