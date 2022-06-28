import { PageWrapper } from '@qonsoll/react-design'
import { SetNewPasswordForm } from 'domains/Session/components'
import { useTranslations } from 'contexts/Translation'

const SetNewPassword = () => {
  const { t } = useTranslations()
  // [ADDITIONAL HOOKS]

  return (
    <PageWrapper
      alignMiddle
      height="100%"
      headingProps={{
        title: t('Set new password'),
        textAlign: 'center',
        marginBottom: 40
      }}
      contentWidth={['100%', '100%', 400]}
    >
      <SetNewPasswordForm />
    </PageWrapper>
  )
}

export default SetNewPassword
