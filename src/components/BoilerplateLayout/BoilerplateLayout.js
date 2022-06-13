import { AccountMenu, LayoutHeader, Logo } from './components'
import {
  Box,
  Button,
  Col,
  Header,
  Layout,
  LayoutSystemProvider,
  Row,
  Text
} from '@qonsoll/react-design'
import { useMemo } from 'react'
import Back from '../Back'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import breakpoints from '../../styles/breakpoints'
import firebase from 'firebase/compat/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useTranslations } from 'contexts/Translation'
// import moment from 'moment'
import { Menu, Dropdown } from 'antd'
import { useHistory } from 'react-router-dom'

const languages = [
  { title: 'English', shortCode: 'en' },
  { title: 'Norsk', shortCode: 'no' }
]

const BoilerplateLayout = ({ children }) => {
  const history = useHistory()
  const [user, loading] = useAuthState(firebase.auth())
  const { setCurrentLanguage, language } = useTranslations()

  /* If the user is authenticated, the component will render the children. Otherwise, it will render
  the fallback component. */
  const isAuthenticated = useMemo(
    () => user?.email && user?.emailVerified && !loading,
    [user?.email, user?.emailVerified, loading]
  )

  const changeLanguage = (shortCodeLanguage) => {
    setCurrentLanguage(shortCodeLanguage)
    // moment.locale(shortCodeLanguage === 'no' ? 'nb' : shortCodeLanguage)
  }

  /* The layoutConfig is memoized to only re-render when isAuthenticated changes. */
  const layoutConfig = {
    isAsideLeft: false,
    asideLeftOuter: true
  }

  const languageMenu = (
    <Menu
      defaultSelectedKeys={language}
      selectable
      style={{
        padding: '8px',
        borderRadius: '8px',
        boxShadow:
          '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
      }}
    >
      {languages?.length &&
        languages?.map((item) => (
          <Menu.Item
            style={{
              borderRadius: '4px',
              padding: '4px'
            }}
            key={item.shortCode}
            onClick={() => changeLanguage(item.shortCode)}
          >
            {item.title}
          </Menu.Item>
        ))}
    </Menu>
  )

  return (
    <ThemeProvider theme={breakpoints}>
      {isAuthenticated ? (
        <LayoutSystemProvider {...layoutConfig}>
          <Layout
            header={
              <Header
                alignItems="center"
                justifyContent="space-between"
                bg="var(--ql-color-white)"
                color="white"
                shadow="0 2px 20px 0px rgb(0 0 0 / 10%)"
              >
                <Box onClick={() => history.push('/bookings')} cursor="pointer">
                  <Logo />
                </Box>
                <Box>
                  <Row noGutters v="center">
                    <Col cw="auto" pr={32}>
                      <AccountMenu
                        id={user?.uid}
                        avatar={user?.photoURL}
                        displayName={user?.displayName}
                        email={user?.email}
                      />
                    </Col>
                    <Col cw="auto">
                      <Dropdown
                        overlay={languageMenu}
                        placement="bottomRight"
                        trigger="click"
                        arrow
                      >
                        <Button
                          ml={2}
                          type="text"
                          style={{ textTransform: 'uppercase' }}
                          icon={
                            <Text
                              strong
                              // style={{
                              //   fontSize: 16
                              // }}
                              fontSize="var(--ql-font-size-body1)"
                              type="secondary"
                            >
                              {language}
                            </Text>
                          }
                        />
                      </Dropdown>
                    </Col>
                  </Row>
                </Box>
              </Header>
            }
          >
            {children}
          </Layout>
        </LayoutSystemProvider>
      ) : (
        <LayoutSystemProvider {...layoutConfig}>
          <Layout
            header={
              <LayoutHeader left={<Back />} center={<Logo height="40" />} />
            }
          >
            {children}
          </Layout>
        </LayoutSystemProvider>
      )}
    </ThemeProvider>
  )
}

BoilerplateLayout.propTypes = {
  children: PropTypes.element
}

export default BoilerplateLayout
