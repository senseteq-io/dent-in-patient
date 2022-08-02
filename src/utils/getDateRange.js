import moment from 'moment'

const getDateRange = (rangeSize) => {
  const currentDate = moment()
  const arr = []
  const end = moment(currentDate).add(rangeSize, 'days')

  while (currentDate.isBefore(end)) {
    arr.push({
      weekday: currentDate.format('dddd'),
      monthName: currentDate.format('MMMM'),
      date: currentDate.format('YYYY-MM-DD'),
      day: currentDate.format('D'),
      year: currentDate.format('YYYY'),
      month: currentDate.format('MM')
    })
    currentDate.add(1, 'days')
  }

  return arr
}

export default getDateRange
