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
// import moment from 'moment'
import { Dropdown, Menu } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'

import Back from '../Back'
import PATHS from 'pages/paths'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import breakpoints from '../../styles/breakpoints'
import firebase from 'firebase/compat/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useTranslations } from 'contexts/Translation'
import { useUser } from 'domains/User/context'

const languages = [
  { title: 'English', shortCode: 'en' },
  { title: 'Norsk', shortCode: 'no' }
]

const { VIPPS_LOGIN_CALLBACK } = PATHS.UNAUTHENTICATED
const { SET_NEW_PASSWORD } = PATHS.AUTHENTICATED

const BoilerplateLayout = ({ children }) => {
  const history = useHistory()
  const location = useLocation()
  const [userAuth] = useAuthState(firebase.auth())
  const { setCurrentLanguage, language } = useTranslations()
  const { user } = useUser()
  /* If the user is authenticated, the component will render the children. Otherwise, it will render
  the fallback component. */
  const isVippsCallbackPage = location.pathname === VIPPS_LOGIN_CALLBACK

  const isAuthenticated = userAuth?.uid && user?._id && !isVippsCallbackPage

  const changeLanguage = (shortCodeLanguage) => {
    setCurrentLanguage(shortCodeLanguage)
    // moment.locale(shortCodeLanguage === 'no' ? 'nb' : shortCodeLanguage)
  }

  const redirectToMainPage = () => {
    location.pathname !== SET_NEW_PASSWORD &&
      history.push(PATHS.AUTHENTICATED.BOOKINGS)
  }

  /* The layoutConfig is memoized to only re-render when isAuthenticated changes. */
  const layoutConfig = {
    isAsideLeft: false,
    asideLeftOuter: true
  }
  const headerLeftComponent = isVippsCallbackPage ? null : <Back />

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
                <Box onClick={redirectToMainPage} cursor="pointer">
                  <Logo />
                </Box>
                <Box>
                  <Row noGutters v="center">
                    <Col cw="auto" pr={32}>
                      <AccountMenu
                        id={userAuth?.uid}
                        avatar={userAuth?.photoURL}
                        displayName={userAuth?.displayName}
                        email={userAuth?.email}
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
              <LayoutHeader
                left={headerLeftComponent}
                center={<Logo height="40" />}
              />
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
