import { Col, PageWrapper, Row } from '@qonsoll/react-design'
import { useEffect, useState } from 'react'

import { Spin } from 'antd'
import { UserSimpleForm } from 'domains/User/components'
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
  const [isUserFormVisible, setIsUserFormVisible] = useState(false)
  // [COMPUTED_PROPERTIES]
  // This parameters check if user should see form to update his personal data

  useEffect(() => {
    if (
      user?._id &&
      dataFromVipps &&
      !user?.data &&
      !dataFromVipps?.personalNumber
    ) {
      setIsUserFormVisible(true)
    }
  }, [user, dataFromVipps])

  const pageTitle = isUserFormVisible
    ? t('Profile data')
    : `${t('Processing Vipps authorization')}...`

  const pageSubtitle = isUserFormVisible
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
      {isUserFormVisible ? (
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
