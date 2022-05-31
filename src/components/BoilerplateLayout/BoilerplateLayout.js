import { AccountMenu, LayoutHeader, Logo, MainMenu } from './components'
import {
  Box,
  Button,
  Layout,
  LayoutSystemProvider
} from '@qonsoll/react-design'
import { CloseOutlined, MenuOutlined } from '@ant-design/icons'
import {
  MenuCollapseWrapper,
  StyledAside
} from './components/LayoutAside/LayoutAside.styled'
import { useMemo, useRef, useState } from 'react'

import Back from '../Back'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { Tooltip } from 'antd'
import breakpoints from '../../styles/breakpoints'
import firebase from 'firebase/compat/app'
import { useAuthState } from 'react-firebase-hooks/auth'

const ASIDE_VISIBILITY = 'aside_visibility'

const BoilerplateLayout = ({ children }) => {
  const [user, loading] = useAuthState(firebase.auth())

  /* If the user is authenticated, the component will render the children. Otherwise, it will render
  the fallback component. */
  const isAuthenticated = useMemo(
    () => user?.email && user?.emailVerified && !loading,
    [user?.email, user?.emailVerified, loading]
  )

  const [asideLeftCollapsed, setAsideLeftCollapsed] = useState(
    !localStorage.getItem(ASIDE_VISIBILITY)
      ? true
      : localStorage.getItem(ASIDE_VISIBILITY) === 'true'
  )

  const handleAsideCollapse = () => {
    setTimeout(() => {
      setAsideLeftCollapsed((prev) => {
        localStorage.setItem(ASIDE_VISIBILITY, !prev)
        return !prev
      })
      setAsideLeftCollapsed(!asideLeftCollapsed)
    }, 200)
  }

  /* The layoutConfig is memoized to only re-render when isAuthenticated changes. */
  const layoutConfig = {
    isAsideLeft: isAuthenticated,
    asideLeftCollapseVariant: 'full',
    asideLeftCollapsed,
    asideLeftOuter: true,
    asideLeftOverlay: false
  }

  const ButtonRef = useRef()

  return (
    <ThemeProvider theme={breakpoints}>
      {isAuthenticated ? (
        <LayoutSystemProvider {...layoutConfig}>
          <Layout
            asideLeft={
              <StyledAside zIndex="3" backgroundColor="rgba(255, 255, 255,1)">
                <Box mb={40}>
                  <Logo />
                </Box>

                <Box mx={-24} mb="auto" overflowY="auto">
                  <MainMenu collapse={asideLeftCollapsed} />
                </Box>

                <Box ml={-3}>
                  <AccountMenu
                    id={user?.uid}
                    avatar={user?.photoURL}
                    displayName={user?.displayName}
                    email={user?.email}
                  />
                </Box>
              </StyledAside>
            }
          >
            <MenuCollapseWrapper
              ref={ButtonRef}
              asideLeftCollapsed={asideLeftCollapsed}
              onClick={handleAsideCollapse}
            >
              {asideLeftCollapsed ? (
                <Tooltip placement="right" title="Show workspaces">
                  <Button variant="glass" size="lg" shape="circle">
                    <MenuOutlined />
                  </Button>
                </Tooltip>
              ) : (
                <Button variant="ghost" size="md" shape="circle">
                  <CloseOutlined />
                </Button>
              )}
            </MenuCollapseWrapper>

            {children}
          </Layout>
        </LayoutSystemProvider>
      ) : (
        <LayoutSystemProvider {...layoutConfig}>
          <Layout header={<LayoutHeader left={<Back />} center={<Logo />} />}>
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
