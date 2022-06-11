import { Col, Menu, MenuItem, Row } from '@qonsoll/react-design'
import { DashboardFilled } from '@ant-design/icons'

import { LanguageSelect } from 'domains/Translation/components'
import { useHistory } from 'react-router-dom'
import { useMemo } from 'react'
import { useTranslations } from 'contexts/Translation'

const MainMenu = () => {
  const { t } = useTranslations()
  const history = useHistory()
  const menuItems = useMemo(
    () => [
      {
        value: 'DASHBOARD',
        icon: <DashboardFilled style={{ fontSize: '24px' }} />,
        text: t('Dashboard'),
        onClick: () => history.push('/dashboard')
      },
      {
        value: 'BOOKINGS',
        icon: <DashboardFilled style={{ fontSize: '24px' }} />,
        text: t('Bookings'),
        onClick: () => history.push('/bookings')
      }
    ],
    [t, history]
  )
  return (
    <>
      <Row mb={16}>
        <Col>
          <LanguageSelect />
        </Col>
      </Row>
      <Menu mode="inline">
        {menuItems.map((item, index) => (
          <MenuItem
            onClick={item.onClick}
            key={`${item.value}-${index}`}
            icon={item.icon}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default MainMenu
