import { Box, Text, Title } from '@qonsoll/react-design'

import PropTypes from 'prop-types'
import { useTransformCalendarItemData } from './hooks'

const CalendarItem = ({
  index,
  weekday,
  dayNumber,
  monthName,
  disabled = false,
  selected = false,
  onClick
}) => {
  const { monthShortName, dateName, textColor, calendarItemWrapperStyles } =
    useTransformCalendarItemData({
      index,
      monthName,
      weekday,
      selected,
      disabled
    })

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick()
    }
  }

  return (
    <Box
      onClick={onClick}
      onKeyPress={handleKeyPress}
      disabled={disabled}
      {...calendarItemWrapperStyles}
    >
      <Text variant="caption2" color={textColor}>
        {monthShortName}
      </Text>
      <Title variant="h5" color={textColor}>
        {dayNumber}
      </Title>
      <Text variant="caption2" color={textColor}>
        {dateName}
      </Text>
    </Box>
  )
}

CalendarItem.propTypes = {
  index: PropTypes.number.isRequired,
  weekday: PropTypes.string.isRequired,
  monthName: PropTypes.string.isRequired,
  dayNumber: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default CalendarItem
