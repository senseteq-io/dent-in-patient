import { LoginForm } from 'domains/Session/components'
import PATHS from 'pages/paths'
import { PageWrapper } from '@qonsoll/react-design'
import { getURLParameterValue } from 'utils'
import { useHandleError } from 'hooks'
import { useHistory } from 'react-router-dom'
import { useSessionActions } from 'domains/Session/hooks'
import { useTranslations } from 'contexts/Translation'

const LoginWithEmail = () => {
  const { t } = useTranslations()
  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const onError = useHandleError()
  const { login } = useSessionActions()
  const { getLastSessionProvider } = useSessionActions()

  // [CLEAN_FUNCTIONS]
  const redirectToForgotPassword = () =>
    history.push(PATHS.UNAUTHENTICATED.FORGOT_PASSWORD)
  const isEmailExists = getURLParameterValue('email')

  const sessionProvider = getLastSessionProvider()

  return (
    <PageWrapper
      alignMiddle
      height="100%"
      headingProps={{
        title: t('Login with email'),
        subTitle: t('Please, enter your email and password'),
        marginBottom: 40
      }}
      contentWidth={['100%', '100%', 400]}
      firstLevelHidden={isEmailExists && sessionProvider === 'email'}
    >
      <LoginForm
        login={login}
        onError={onError}
        onForgotPasswordClick={redirectToForgotPassword}
      />
    </PageWrapper>
  )
}

export default LoginWithEmail
