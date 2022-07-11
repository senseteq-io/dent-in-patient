import { useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import PATHS from 'pages/paths'
import { notification } from 'antd'
import { updateVippsBookingFromWidget } from 'domains/Booking/helpers'
import { urlParamsToObject } from 'utils'
import { useUser } from 'domains/User/context'
import { useVippsAuth } from 'domains/Session/hooks'

const { LOGIN } = PATHS.UNAUTHENTICATED

const useVippsFlowBackgroundActions = () => {
  const history = useHistory()
  const location = useLocation()
  const vippsLogin = useVippsAuth()
  const { user } = useUser()

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
    const processVippsLogin = async () => {
      setIsLoginCalled(true)
      // Get user info from vipps, authorize to app if successfully get info
      // and save info to state for next steps
      const _userAuthInfo = await vippsLogin(urlParamsObject)
      setDataFromVipps(_userAuthInfo)
    }
    if (!isLoginCalled && urlParamsObject?.code) {
      processVippsLogin()
    }
  }, [isLoginCalled, urlParamsObject, vippsLogin])

  useEffect(() => {
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
          description: `Failed to update booking. ${e.message}`
        })
        console.error(e)
      }
    }

    if (user?.data && dataFromVipps?.bookingId && !dataFromVipps?.isAuth) {
      processVippsBooking()
    }
  }, [dataFromVipps, history, user])

  return dataFromVipps
}
export default useVippsFlowBackgroundActions
