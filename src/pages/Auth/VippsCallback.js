import { Col, PageWrapper, Row } from '@qonsoll/react-design'
import { useEffect, useMemo, useState } from 'react'

import PATHS from '../paths'
import { Spin } from 'antd'
import { UserSimpleForm } from 'domains/User/components'
import { updateVippsBookingFromWidget } from 'domains/Booking/helpers'
import { urlParamsToObject } from '../../utils'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useTranslations } from 'contexts/Translation'
import { useUser } from 'domains/User/context'
import { useVippsLogin } from '../../hooks'

const { AFTER_LOGIN } = PATHS.CONFIG

const VippsCallback = () => {
  const [isLoginCalled, setIsLoginCalled] = useState(false)
  const [dataFromVipps, setDataFromVipps] = useState(null)

  // [ADDITIONAL HOOKS]
  const location = useLocation()
  const urlParamsObject = urlParamsToObject(location.search)
  const history = useHistory()
  const vippsLogin = useVippsLogin()
  const { t } = useTranslations()
  const { user } = useUser()

  // Vipps login
  useEffect(() => {
    if (!isLoginCalled && urlParamsObject?.code) {
      setIsLoginCalled(true)
      const _userAuthInfo = vippsLogin(urlParamsObject)
      setDataFromVipps(_userAuthInfo)
    }
  }, [urlParamsObject, vippsLogin, isLoginCalled, history])

  useEffect(() => {
    if (user?.data && dataFromVipps?.bookingId && !dataFromVipps?.isAuth) {
      //update pending booking from widget
      updateVippsBookingFromWidget({
        pendingBookingId: dataFromVipps.bookingId,
        clientPhone: dataFromVipps.phoneNumber,
        userId: user._id
      })
        .then(() => {
          history.push(AFTER_LOGIN)
        })
        .catch((err) =>
          console.error('Error occurred during updating pending booking. ', err)
        )
    }
  }, [dataFromVipps, history, user])

  const pageTitle = useMemo(
    () =>
      user?.data
        ? t('Profile data')
        : `${t('Processing Vipps authorization')}...`,
    [t, user]
  )

  const pageSubtitle = useMemo(
    () =>
      user?.data
        ? t('Please, give us your personal number info and ')
        : t(
            'Your account is being verified, please wait, the process will not take more than 10 seconds'
          ),
    [t, user]
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
      {!user?.data ? (
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
