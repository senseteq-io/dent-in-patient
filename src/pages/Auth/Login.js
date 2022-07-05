import { useLastSession, useSessionActions } from 'domains/Session/hooks'

import { AuthMethods } from 'domains/Session/components'
import PATHS from 'pages/paths'
import { PageWrapper } from '@qonsoll/react-design'
import { useHistory } from 'react-router-dom'
import { useTranslations } from 'contexts/Translation'

const Login = () => {
  const { t } = useTranslations()
  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const lastSession = useLastSession()
  const { googleLogin } = useSessionActions()

  // [CLEAN_FUNCTIONS]
  const redirectToLoginWithEmail = () => {
    lastSession && lastSession.email
      ? history.push(`${PATHS.UNAUTHENTICATED.LOGIN_WITH_EMAIL}?email`)
      : history.push(PATHS.UNAUTHENTICATED.LOGIN_WITH_EMAIL)
  }

  return (
    <PageWrapper
      alignMiddle
      height="100%"
      headingProps={{
        title: lastSession
          ? t('Welcome back') + ' 👋'
          : t('Nice to see you') + ' 💪',
        subTitle: lastSession
          ? t(
              'alreadyKnowEachOther',
              'It seems that we already know each other. Choose any of the available authorization methods.'
            )
          : t(
              'chooseMethodBelow',
              'Choose any of the available methods below.'
            ),
        marginBottom: 40
      }}
      contentWidth={['100%', '100%', 400]}
    >
      <AuthMethods
        authTypeText="Login"
        googleAuth={googleLogin}
        redirectToFormWithEmail={redirectToLoginWithEmail}
        authSwitchText={t('Do not have account') + '?'}
        authSwitchLinktext={t('Sign up')}
        authSwitchPath={PATHS.UNAUTHENTICATED.SIGNUP}
        lastSession={lastSession}
      />
    </PageWrapper>
  )
}

export default Login
