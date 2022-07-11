import { Col, PageWrapper, Row } from '@qonsoll/react-design'

import { Spin } from 'antd'
import { UserSimpleForm } from 'domains/User/components'
import { useMemo } from 'react'
import { useTranslations } from 'contexts/Translation'
import { useUser } from 'domains/User/context'
import { useVippsFlowBackgroundActions } from 'domains/Session/hooks'

const VippsCallback = () => {
  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()
  const { user } = useUser()
  // Process vipps authorization for user,
  // if user came from widget and have personal number
  // update pending booking with user info
  const dataFromVipps = useVippsFlowBackgroundActions()

  // [COMPUTED_PROPERTIES]
  // This parameters check if user should see form to update his personal data
  const isUserWithoutSSN = useMemo(
    () => user?._id && !user?.data && !dataFromVipps?.personalNumber,
    [user, dataFromVipps]
  )

  const pageTitle = isUserWithoutSSN
    ? t('Profile data')
    : `${t('Processing Vipps authorization')}...`

  const pageSubtitle = isUserWithoutSSN
    ? t('Please, enter your profile data to complete your booking')
    : t(
        'Your account is being verified, please wait, the process will not take more than 10 seconds'
      )

  return (
    <PageWrapper
      alignMiddle
      height="100%"
      headingProps={{
        title: pageTitle,
        subTitle: pageSubtitle,
        marginBottom: 40
      }}
      contentWidth={['100%', '100%', 400]}
    >
      {isUserWithoutSSN ? (
        <UserSimpleForm initialValues={dataFromVipps} />
      ) : (
        <Row h="center">
          <Col cw={12}>
            <Spin size="large" spinning />
          </Col>
        </Row>
      )}
    </PageWrapper>
  )
}
export default VippsCallback
