import * as firebaseui from 'firebaseui'

import { Box, Button, Divider, Text } from '@qonsoll/react-design'

import { LastSessionUser } from 'domains/Session/components'
// import { Link } from 'react-router-dom'
import { MailOutlined } from '@ant-design/icons'
import PATHS from 'pages/paths'
import PropTypes from 'prop-types'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { VippsAuthButton } from '../../components'
import firebase from 'firebase/compat/app'
import { useHistory } from 'react-router-dom'
import { useSessionActions } from 'domains/Session/hooks'
import { useState } from 'react'
import { useTranslations } from 'contexts/Translation'
import { v4 as uuid } from 'uuid'

const VIPPS_CALLBACK_PATH = '/auth/vipps-callback'
const CLIENT_ID = process.env.REACT_APP_VIPPS_CLIENT_ID
const VIPPS_URL = process.env.REACT_APP_VIPPS_API_URL
const VIPPS_AUTH_ENDPOINT = '/access-management-1.0/access/oauth2/auth'
const APP_URL = process.env.REACT_APP_URL

const LoginMethods = (props) => {
  const { t } = useTranslations()
  const {
    authTypeText,
    // googleAuth,
    redirectToFormWithEmail,
    // authSwitchText,
    // authSwitchLinktext,
    // authSwitchPath,
    lastSession
  } = props

  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const { getLastSessionProvider } = useSessionActions()

  const [autoGeneratedUserID] = useState(`auth_${uuid()}`)

  // [CLEAN_FUNCTIONS]
  const redirectToLoginWithEmail = () => {
    history.push(PATHS.UNAUTHENTICATED.LOGIN_WITH_EMAIL)
  }

  // Redirect user to vipps endpoint to complete login
  const handleVippsAuth = () => {
    const url = new URL(VIPPS_URL + VIPPS_AUTH_ENDPOINT)
    const params = {
      response_type: 'code',
      client_id: CLIENT_ID,
      redirect_uri: APP_URL + VIPPS_CALLBACK_PATH,
      scope: 'openid email phoneNumber name api_version_2 address nin',
      state: autoGeneratedUserID
    }

    url.search = new URLSearchParams(params).toString()
    window.location.href = url
  }
  const sessionProvider = getLastSessionProvider()

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
        // authMethod: 'https://accounts.google.com',
        customParameters: {
          // Forces account selection even when one account is available.
          prompt: 'select_account'
        },
        clientId:
          '664849237841-vcog9pfld92qp0ofr5v67c1a4h0anggm.apps.googleusercontent.com'
      }
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    },
    credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
    // queryParameterForWidgetMode: 'mode'
  }

  return (
    <>
      <StyledFirebaseAuth
        uiCallback={(ui) => ui.disableAutoSignIn()}
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
      <Box mt={3}>
        <VippsAuthButton size="large" onClick={handleVippsAuth} />
      </Box>

      <Box>
        <Divider>
          <Text variant="overline" type="secondary">
            {t('Or')}
          </Text>
        </Divider>
      </Box>

      {sessionProvider === 'email' && lastSession?.email ? (
        <LastSessionUser
          lastSession={lastSession}
          onChangeAccount={redirectToLoginWithEmail}
          redirectTo={redirectToFormWithEmail}
        />
      ) : (
        <Button
          size="large"
          block
          icon={<MailOutlined />}
          onClick={redirectToFormWithEmail}
        >
          {authTypeText} {t('with email')}
        </Button>
      )}
      {/* <Box display="flex" justifyContent="center" mt={24}>
        <Text type="secondary" mr={1}>
          {authSwitchText}
        </Text>
        <Link to={authSwitchPath}>{authSwitchLinktext}</Link>
      </Box> */}
    </>
  )
}

LoginMethods.propTypes = {
  authSwitchLinktext: PropTypes.any,
  authSwitchPath: PropTypes.any,
  authSwitchText: PropTypes.any,
  authTypeText: PropTypes.any,
  lastSession: PropTypes.any,
  redirectToFormWithEmail: PropTypes.any
}

export default LoginMethods
