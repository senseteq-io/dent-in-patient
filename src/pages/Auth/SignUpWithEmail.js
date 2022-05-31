import { PageWrapper } from '@qonsoll/react-design'
import { SignupForm } from 'domains/Session/components'
import { useHandleError } from 'hooks'
import { useSessionActions } from 'domains/Session/hooks'
import { useTranslations } from 'contexts/Translation'

const SignUpWithEmail = () => {
  const { t } = useTranslations()
  // [ADDITIONAL_HOOKS]
  const onError = useHandleError()
  const { signup } = useSessionActions()

  return (
    <PageWrapper
      alignMiddle
      height="100%"
      headingProps={{
        title: t('Sign up with email'),
        subTitle: t('Please, enter your email and password'),
        marginBottom: 40
      }}
      contentWidth={['100%', '100%', 400]}
    >
      <SignupForm onError={onError} signup={signup} />
    </PageWrapper>
  )
}

export default SignUpWithEmail
