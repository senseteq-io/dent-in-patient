import PropTypes from 'prop-types'
import { Text } from '@qonsoll/react-design'
import { UserOutlined } from '@ant-design/icons'

export default function ClinicianAvatarIcon({ name, variant }) {
  const getFirstLetters = (name) => {
    const nameString = name?.split(' ')
    const firstLetters = (
      nameString[0][0] + nameString[nameString.length - 1][0]
    ).toUpperCase()

    return firstLetters
  }
  return name ? (
    <Text variant={variant}>{getFirstLetters(name)}</Text>
  ) : (
    <UserOutlined />
  )
}

ClinicianAvatarIcon.propTypes = {
  name: PropTypes.string,
  variant: PropTypes.string
}
