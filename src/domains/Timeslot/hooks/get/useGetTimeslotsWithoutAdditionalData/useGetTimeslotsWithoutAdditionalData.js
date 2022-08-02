import { useEffect, useState } from 'react'

import moment from 'moment'
import { useTranslations } from '@qonsoll/translation'

const DENT_IN_FUNCTIONS_API_URL =
  process.env.REACT_APP_DENT_IN_FUNCTIONS_API_URL
const FETCH_DATE_FORMAT = 'YYYY-MM-DD'

const useGetTimeslotsWithoutAdditionalData = (props) => {
  const { booking, isModalVisible, selectedDate, setSelectedDate } = props

  const { t } = useTranslations()

  const [timeslotsWithoutAdditionalData, setTimeslotsWithoutAdditionalData] =
    useState([])
  const [
    timeslotsWithoutAdditionalDataLoading,
    setTimeslotsWithoutAdditionalDataLoading
  ] = useState(false)

  // Compute start fetch dates with delay of 7 days
  // as one fetch get timeslots for 7 days
  const fetchDates = [0, 1, 2, 3].map((day) =>
    moment()
      .add(day * 7, 'days')
      .format(FETCH_DATE_FORMAT)
  )
  // Check fetched days and set as selected first day that have timeslots
  useEffect(() => {
    if (
      isModalVisible &&
      timeslotsWithoutAdditionalData?.length > 0 &&
      !selectedDate
    ) {
      const selectedDay = timeslotsWithoutAdditionalData.find(
        (dayTimeslotsObj) => {
          return dayTimeslotsObj.timeslots?.length > 0
        }
      )?.date
      setSelectedDate(selectedDay)
    }
  }, [
    isModalVisible,
    selectedDate,
    setSelectedDate,
    timeslotsWithoutAdditionalData
  ])

  useEffect(() => {
    const fetchCalendarTimeslots = async () => {
      setTimeslotsWithoutAdditionalDataLoading(true)
      // Compute fetch url
      const timeslotsWithoutAdditionalDataFetchUrl = `${DENT_IN_FUNCTIONS_API_URL}/timeslots/treatments/${booking?.treatmentId}/light`
      const timeslotsFetchParams = `&clinicId=${booking?.clinicId}&clinicianId=${booking?.clinicianId}`

      // Send timeslots fetch requests
      const timeslotsWithoutAdditionalDataPromises = fetchDates.map((date) =>
        fetch(
          `${timeslotsWithoutAdditionalDataFetchUrl}?date=${date}${timeslotsFetchParams}`
        )
      )

      // Resolve all timeslots fetch promises
      const timeslotsPromisesResponse = await Promise.allSettled(
        timeslotsWithoutAdditionalDataPromises
      )

      // Parse all timeslots fetch responses
      const timeslotsParsedResponses = await Promise.allSettled(
        timeslotsPromisesResponse
          .map((response) => response?.value?.json())
          .filter(Boolean)
      )

      // Merge all arrays of timeslots objects to one array
      const timeslotsWithoutAdditionalData = timeslotsParsedResponses.reduce(
        (previousTimeslots, currentTimeslots) => [
          ...previousTimeslots,
          ...currentTimeslots?.value?.data?.timeslots
        ],
        []
      )
      // As we fetch timeslots for 1 day, it always returns an array with 1 element
      setTimeslotsWithoutAdditionalData(timeslotsWithoutAdditionalData)
      setTimeslotsWithoutAdditionalDataLoading(false)
    }

    // If already fetched timeslots, do not fetch again and only when modal is visible
    if (
      isModalVisible &&
      !timeslotsWithoutAdditionalData?.length &&
      !timeslotsWithoutAdditionalDataLoading
    ) {
      fetchCalendarTimeslots()
    }
  }, [
    booking,
    fetchDates,
    isModalVisible,
    selectedDate,
    t,
    timeslotsWithoutAdditionalData,
    timeslotsWithoutAdditionalDataLoading
  ])

  return [timeslotsWithoutAdditionalData, timeslotsWithoutAdditionalDataLoading]
}

export default useGetTimeslotsWithoutAdditionalData
