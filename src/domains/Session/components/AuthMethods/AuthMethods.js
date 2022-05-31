import * as firebaseui from 'firebaseui'

import { Box, Button, Divider, Text } from '@qonsoll/react-design'

import { LastSessionUser } from 'domains/Session/components'
import { Link } from 'react-router-dom'
import { MailOutlined } from '@ant-design/icons'
import PATHS from 'pages/paths'
import PropTypes from 'prop-types'
import { StyledFirebaseAuth } from 'react-firebaseui'
import firebase from 'firebase/compat/app'
import { useHistory } from 'react-router-dom'
import { useSessionActions } from 'domains/Session/hooks'
import { useTranslations } from 'contexts/Translation'

const LoginMethods = (props) => {
  const { t } = useTranslations()
  const {
    authTypeText,
    // googleAuth,
    redirectToFormWithEmail,
    authSwitchText,
    authSwitchLinktext,
    authSwitchPath,
    lastSession
  } = props

  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const { getLastSessionProvider } = useSessionActions()

  // [CLEAN_FUNCTIONS]
  const redirectToLoginWithEmail = () => {
    history.push(PATHS.UNAUTHENTICATED.LOGIN_WITH_EMAIL)
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
          '1044286479835-daqk42j1p13jedivjpn6akp3cgfbvfm6.apps.googleusercontent.com'
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
      <Box display="flex" justifyContent="center" mt={24}>
        <Text type="secondary" mr={1}>
          {authSwitchText}
        </Text>
        <Link to={authSwitchPath}>{authSwitchLinktext}</Link>
      </Box>
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
