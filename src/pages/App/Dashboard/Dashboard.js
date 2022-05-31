import { PageWrapper } from '@qonsoll/react-design'
import { useTranslations } from 'contexts/Translation'

const Dashboard = () => {
  const { t } = useTranslations()
  return (
    <PageWrapper headingProps={{ title: t('Dashboard') }}>Content</PageWrapper>
  )
}

export default Dashboard
