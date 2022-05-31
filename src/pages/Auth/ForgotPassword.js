import { ForgotPasswordForm } from 'domains/Session/components'
import { PageWrapper } from '@qonsoll/react-design'
import { useHandleError } from 'hooks'
import { useSessionActions } from 'domains/Session/hooks'
import { useTranslations } from 'contexts/Translation'

const ForgotPassword = () => {
  const { t } = useTranslations()
  // [ADDITIONAL HOOKS]
  const { resetPassword } = useSessionActions()
  const onError = useHandleError()

  return (
    <PageWrapper
      alignMiddle
      height="100%"
      headingProps={{
        title: t('Restore password'),
        subTitle: t('Enter the email address associated with your account'),
        textAlign: 'center',
        marginBottom: 40
      }}
      contentWidth={['100%', '100%', 400]}
    >
      <ForgotPasswordForm resetPassword={resetPassword} onError={onError} />
    </PageWrapper>
  )
}

export default ForgotPassword
