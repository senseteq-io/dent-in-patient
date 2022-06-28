import { useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { urlParamsToObject } from '../../utils'
import { useVippsLogin } from '../../hooks'
import { PageWrapper, Row, Col } from '@qonsoll/react-design'
import { Spin } from 'antd'
import { UserSimpleForm } from 'domains/User/components'
import { useTranslations } from 'contexts/Translation'
import { useUser } from 'domains/User/context'
import { updateVippsBookingFromWidget } from 'domains/Booking/helpers'
import PATHS from '../paths'

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
    if (user?.data && dataFromVipps?.bookingId) {
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
      dataFromVipps?.additionalUserInfo?.isNewUser
        ? t('Profile data')
        : `${t('Processing Vipps authorization')}...`,
    [t, dataFromVipps]
  )

  const pageSubtitle = useMemo(
    () =>
      dataFromVipps?.additionalUserInfo?.isNewUser
        ? t('Please, give us your personal number info and ')
        : t(
            'Your account is being verified, please wait, the process will not take more than 10 seconds'
          ),
    [t, dataFromVipps]
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
      {user?.data ? (
        <UserSimpleForm
          initialValues={{ uid: 'UmsJeAqB8UPeIcVQmAxZnp6F6ut2' }}
        />
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
