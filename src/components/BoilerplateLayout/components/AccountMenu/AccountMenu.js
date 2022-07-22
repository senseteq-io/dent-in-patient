import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'

import { Account } from '@qonsoll/react-design'
import PATHS from 'pages/paths'
import PropTypes from 'prop-types'
import firebase from 'firebase/compat/app'
import { useMemo } from 'react'
import { useTranslations } from 'contexts/Translation'

const AccountMenu = ({ id, avatar, displayName, email }) => {
  const { t } = useTranslations()
  const history = useHistory()
  const location = useLocation()
  const menu = useMemo(
    () => [
      {
        type: 'item',
        text: t('Profile'),
        icon: <UserOutlined />,
        danger: false,
        disabled: location.pathname === PATHS.AUTHENTICATED.SET_NEW_PASSWORD,
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
        onClick: async () => {
          await firebase.auth().signOut()
          history.push(PATHS.CONFIG.AFTER_LOGOUT)
        }
      }
    ],
    [history, id, location.pathname, t]
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
