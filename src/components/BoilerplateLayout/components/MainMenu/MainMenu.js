import { Col, Menu, MenuItem, Row } from '@qonsoll/react-design'

import { AppstoreOutlined } from '@ant-design/icons'
import { LanguageSelect } from 'domains/Translation/components'
import { useMemo } from 'react'
import { useTranslations } from 'contexts/Translation'

const MainMenu = () => {
  const { t } = useTranslations()
  const menuItems = useMemo(
    () => [
      {
        value: 'DASHBOARD',
        icon: <AppstoreOutlined />,
        text: t('Dashboard')
      }
      // {
      //   value: 'ROLES',
      //   icon: <TeamOutlined />,
      //   text: t('Roles')
      // },
      // {
      //   value: 'STYLING',
      //   icon: <FormatPainterOutlined />,
      //   text: t('Styling')
      // },
      // {
      //   value: 'DB_STRUCTURE',
      //   icon: <DatabaseOutlined />,
      //   text: t('DB structure')
      // }
    ],
    [t]
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
          <MenuItem key={`${item.value}-${index}`} icon={item.icon}>
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default MainMenu
