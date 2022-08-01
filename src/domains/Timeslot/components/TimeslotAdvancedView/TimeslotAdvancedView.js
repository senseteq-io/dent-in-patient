import { Avatar, Box, Card, Text, Title } from '@qonsoll/react-design'

import { ClinicianAvatarIcon } from 'domains/Clinician/components'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useMemo } from 'react'

const TimeslotAdvancedView = ({
  start,
  end,
  clinic,
  clinician,
  selected,
  handleTimeslotSelect
}) => {
  //   console.log(clinician)
  const onTimeslotClick = () => {
    const timeslotData = {
      start,
      end
    }
    console.log('selected timeslot: ', timeslotData)
    console.log(selected)
    handleTimeslotSelect(timeslotData)
  }

  const startTime = useMemo(() => moment(start).format('HH:mm'), [start])
  const endTime = useMemo(() => moment(end).format('HH:mm'), [end])
  const timeslotPeriod = useMemo(
    () => `${startTime} - ${endTime}`,
    [startTime, endTime]
  )
  return (
    <Card
      onClick={onTimeslotClick}
      cursor="pointer"
      hoverable={true}
      bg={
        selected
          ? 'var(--ql-color-accent1-t-lighten6)'
          : 'var(--ql-color-white)'
      }
    >
      <Box mb={12}>
        <Title variant="h6">{timeslotPeriod}</Title>
        <Text variant="body2">{clinic?.address1}</Text>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        // className="flex row align-center gap-large"
      >
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
