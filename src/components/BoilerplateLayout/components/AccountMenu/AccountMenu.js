import { LogoutOutlined, UserOutlined } from '@ant-design/icons'

import { Account } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import firebase from 'firebase/compat/app'
import { useHistory } from 'react-router-dom'
import { useMemo } from 'react'
import { useTranslations } from 'contexts/Translation'

const AccountMenu = ({ id, avatar, displayName, email }) => {
  const { t } = useTranslations()
  const history = useHistory()
  const menu = useMemo(
    () => [
      {
        type: 'item',
        text: t('Profile'),
        icon: <UserOutlined />,
        danger: false,
        disabled: false,
        onClick: () => {
          history.push(`/users/${id}`)
        }
      },
      {
        type: 'item',
        text: t('Log out'),
        icon: <LogoutOutlined />,
        danger: true,
        disabled: false,
        onClick: () => firebase.auth().signOut()
      }
    ],
    [history, id, t]
  )
  return (
    <Account
      avatar={avatar}
      short
      title={displayName || t('No name')}
      caption={email || t('No email')}
      isEllipsis
      menu={menu}
      menuPlacement="topRight"
    />
  )
}

AccountMenu.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  displayName: PropTypes.string,
  email: PropTypes.string
}

export default AccountMenu
