import { AuthMethods } from 'domains/Session/components'
import PATHS from 'pages/paths'
import { PageWrapper } from '@qonsoll/react-design'
import { useHistory } from 'react-router-dom'
import { useSessionActions } from 'domains/Session/hooks'
import { useState } from 'react'
import { useTranslations } from 'contexts/Translation'

function Signup() {
  const { t } = useTranslations()
  // [ADDITIONAL_HOOKS]
  const history = useHistory()
  const { googleLogin } = useSessionActions()

  // [COMPONENT_STATE]
  const [loading, setLoading] = useState(false)

  // [CUSTOM_FUNCTIONS]
  const toggleLoading = () => setLoading(!loading)

  // [CLEAN_FUNCTIONS]
  const redirectToSignInWithEmail = () =>
    history.push(PATHS.UNAUTHENTICATED.SIGNUP_WITH_EMAIL)

  return (
    <PageWrapper
      alignMiddle
      height="100%"
      headingProps={{
        title: t('Sign up'),
        subTitle: t('Create an account easily using any of the methods below'),
        textAlign: 'center',
        marginBottom: 40
      }}
      contentWidth={['100%', '100%', 400]}
    >
      <AuthMethods
        authTypeText={t('Sign up')}
        googleAuth={() =>
          googleLogin({ before: toggleLoading, after: toggleLoading })
        }
        redirectToFormWithEmail={redirectToSignInWithEmail}
        authSwitchText={t('Already have account') + '?'}
        authSwitchLinktext={t('Login')}
        authSwitchPath={PATHS.UNAUTHENTICATED.LOGIN}
      />
    </PageWrapper>
  )
}

export default Signup
