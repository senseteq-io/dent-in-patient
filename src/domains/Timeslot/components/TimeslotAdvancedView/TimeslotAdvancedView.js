import { Avatar, Box, Card, Text, Title } from '@qonsoll/react-design'

import { ClinicianAvatarIcon } from 'domains/Clinician/components'
import PropTypes from 'prop-types'
import { useTransformTimeslotViewData } from 'domains/Timeslot/hooks/transform'

const TimeslotAdvancedView = ({
  start,
  end,
  clinic,
  clinician,
  selected,
  handleTimeslotSelect
}) => {
  const { timeslotPeriod, cardBgColor } = useTransformTimeslotViewData({
    start,
    end,
    selected
  })
  const onTimeslotClick = () => {
    const timeslotData = {
      start,
      end
    }
    handleTimeslotSelect(timeslotData)
  }

  return (
    <Card
      onClick={onTimeslotClick}
      cursor="pointer"
      hoverable={true}
      bg={cardBgColor}
    >
      <Box mb={12}>
        <Title variant="h6">{timeslotPeriod}</Title>
        <Text variant="body2">{clinic?.address1}</Text>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Avatar
          mr={3}
          size="40px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          icon={<ClinicianAvatarIcon variant="body2" name={clinician?.name} />}
          src={clinician?.avatarUrl}
        />
        <Text variant="body2">{clinician?.name}</Text>
      </Box>
    </Card>
  )
}

TimeslotAdvancedView.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  clinic: PropTypes.object.isRequired,
  clinician: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  handleTimeslotSelect: PropTypes.func.isRequired
}

export default TimeslotAdvancedView
