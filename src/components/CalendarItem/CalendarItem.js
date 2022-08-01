import { Box, Text, Title } from '@qonsoll/react-design'

import PropTypes from 'prop-types'

const CalendarItem = ({
  index,
  name,
  monthName,
  showedDay,
  number,
  disabled = false,
  selected = false,
  onClick
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick()
    }
  }

  const monthShortName =
    monthName.charAt(0).toUpperCase() + monthName.substring(1, 3)
  const dateName = name.charAt(0).toUpperCase() + name.substring(1, 3)
  const textColor = selected
    ? 'var(--ql-typography-text-color-primary-inverse)'
    : 'var(--ql-typography-text-color-primary)'
  return (
    <Box
      onClick={onClick}
      onKeyPress={handleKeyPress}
      disabled={disabled}
      bg={
        selected ? 'var(--ql-color-accent1)' : 'var(--ql-color-dark-t-lighten6)'
      }
      py={16}
      px={20}
      m={2}
      ml={index === 0 ? 0 : 2}
      mr={index === 29 ? 0 : 2}
      borderRadius={16}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      cursor={disabled ? 'not-allowed' : 'pointer'}
    >
      {showedDay ? (
        <>
          <Text color="primary" variant="caption2">
            {monthShortName}
          </Text>
          <Title color="primary" variant="h4">
            {number.toString()}
          </Title>
          <Text color="primary" variant="caption2">
            {name}
          </Text>
        </>
      ) : (
        <>
          <Text variant="caption2" color={textColor}>
            {monthShortName}
          </Text>
          <Title variant="h5" color={textColor}>
            {number.toString()}
          </Title>
          <Text variant="caption2" color={textColor}>
            {dateName}
          </Text>
        </>
      )}
    </Box>
  )
}

CalendarItem.propTypes = {
  index: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  monthName: PropTypes.string.isRequired,
  showedDay: PropTypes.bool,
  number: PropTypes.number.isRequired,
  cursor: PropTypes.string,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default CalendarItem
