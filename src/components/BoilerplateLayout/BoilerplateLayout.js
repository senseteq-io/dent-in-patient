import {
  AccountMenu,
  LayoutAside,
  LayoutHeader,
  Logo,
  MainMenu
} from './components'
import { Layout, LayoutSystemProvider } from '@qonsoll/react-design'

import Back from '../Back'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import breakpoints from '../../styles/breakpoints'
import firebase from 'firebase/compat/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useMemo } from 'react'

const BoilerplateLayout = ({ children }) => {
  const [user, loading] = useAuthState(firebase.auth())

  /* If the user is authenticated, the component will render the children. Otherwise, it will render
  the fallback component. */
  const isAuthenticated = useMemo(
    () => user?.email && user?.emailVerified && !loading,
    [user?.email, user?.emailVerified, loading]
  )

  /* The layoutConfig is memoized to only re-render when isAuthenticated changes. */
  const layoutConfig = useMemo(
    () => ({
      isAsideLeft: isAuthenticated
    }),
    [isAuthenticated]
  )

  return (
    <ThemeProvider theme={breakpoints}>
      {isAuthenticated ? (
        <LayoutSystemProvider {...layoutConfig}>
          <Layout
            asideLeft={
              <LayoutAside
                top={<Logo />}
                center={<MainMenu />}
                bottom={
                  <AccountMenu
                    id={user?.uid}
                    avatar={user?.photoURL}
                    displayName={user?.displayName}
                    email={user?.email}
                  />
                }
              />
            }
          >
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
