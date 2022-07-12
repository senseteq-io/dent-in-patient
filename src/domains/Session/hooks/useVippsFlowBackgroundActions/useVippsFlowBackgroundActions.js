import { useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import PATHS from 'pages/paths'
import { notification } from 'antd'
import { updateVippsBookingFromWidget } from 'domains/Booking/helpers'
import { urlParamsToObject } from 'utils'
import { useTranslations } from 'contexts/Translation'
import { useUser } from 'domains/User/context'
import { useVippsAuth } from 'domains/Session/hooks'

const { LOGIN } = PATHS.UNAUTHENTICATED

const useVippsFlowBackgroundActions = () => {
  const history = useHistory()
  const location = useLocation()
  const vippsLogin = useVippsAuth()
  const { user } = useUser()
  const { t } = useTranslations()

  // [COMPONENT_STATE_HOOKS]
  const [isLoginCalled, setIsLoginCalled] = useState(false)
  const [dataFromVipps, setDataFromVipps] = useState(null)

  // Get Vipps parameters from url
  const urlParamsObject = useMemo(
    () => urlParamsToObject(location.search),
    [location.search]
  )

  // Vipps login
  useEffect(() => {
    if (!isLoginCalled && urlParamsObject?.code) {
      const processVippsLogin = async () => {
        setIsLoginCalled(true)
        // Get user info from vipps, authorize to app if successfully get info
        // and save info to state for next steps
        const userAuthInfo = await vippsLogin(urlParamsObject)
        setDataFromVipps(userAuthInfo)
      }

      processVippsLogin()
    }
  }, [isLoginCalled, urlParamsObject, vippsLogin])

  useEffect(() => {
    if (user?.data && dataFromVipps?.bookingId && !dataFromVipps?.isAuth) {
      const processVippsBooking = async () => {
        try {
          // If user booked appointment from vipps in widget, update booking with user info
          await updateVippsBookingFromWidget({
            pendingBookingId: dataFromVipps.bookingId,
            clientPhone: dataFromVipps.phoneNumber,
            userId: user._id
          })
          history.push(LOGIN)
        } catch (e) {
          notification.error({
            message: 'Error',
            description: t('Failed to update booking')
          })
          console.error(e)
        }
      }

      processVippsBooking()
    }
  }, [dataFromVipps, history, t, user])

  return dataFromVipps
}
export default useVippsFlowBackgroundActions
