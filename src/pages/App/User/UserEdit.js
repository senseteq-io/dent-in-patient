import { PageWrapper } from '@qonsoll/react-design'
import { UserAdvancedForm } from 'domains/User/components'
import { useTranslations } from 'contexts/Translation'

const UserEdit = () => {
  const { t } = useTranslations()
  return (
    <PageWrapper headingProps={{ title: t('Edit profile') }}>
      <UserAdvancedForm />
    </PageWrapper>
  )
}

export default UserEdit
