import {
  BOOKED_STATUS,
  FAILED_STATUS
} from 'domains/Booking/__constants__/bookingStatuses'
import { useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { COLLECTIONS } from '__constants__'
import PATHS from 'pages/paths'
import firebase from 'firebase/compat/app'
import { notification } from 'antd'
import { updateVippsBookingFromWidget } from 'domains/Booking/helpers'
import { urlParamsToObject } from 'utils'
import { useDocumentData } from 'react-firebase-hooks/firestore'
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
  const [isBookingCalled, setIsBookingCalled] = useState(false)
  const [dataFromVipps, setDataFromVipps] = useState(null)

  // Get Vipps parameters from url
  const urlParamsObject = useMemo(
    () => urlParamsToObject(location.search),
    [location.search]
  )

  const [clientLastProcessedBooking] = useDocumentData(
    dataFromVipps?.bookingId &&
      firebase
        .firestore()
        .collection(COLLECTIONS.BOOKINGS)
        .doc(dataFromVipps?.bookingId)
  )

  useEffect(() => {
    if (
      user?.data &&
      dataFromVipps?.bookingId &&
      !dataFromVipps?.isAuth &&
      clientLastProcessedBooking?._id &&
      [BOOKED_STATUS, FAILED_STATUS].includes(
        clientLastProcessedBooking?.status
      )
    ) {
      // This useEffect helps to await backend listener that update booking status
      // and then we display is booking was successful or something went wrong
      clientLastProcessedBooking.status === BOOKED_STATUS &&
        notification.success({
          message: t('Success'),
          description: t('Booking was successful')
        })

      clientLastProcessedBooking.status === FAILED_STATUS &&
        notification.error({
          message: t('Booking error'),
          description: t(clientLastProcessedBooking?.errorMessage)
        })

      // Redirect user to login page to use redirects conditions from Redirects context
      history.push(LOGIN)
    }
  }, [user, dataFromVipps, clientLastProcessedBooking, history, t])

  // Vipps login
  useEffect(() => {
    if (!isLoginCalled && urlParamsObject?.code) {
      const processVippsLogin = async () => {
        setIsLoginCalled(true)
        // Get user info from vipps, authorize to app if successfully get info
        // and save info to state for next steps
        const userAuthInfo = await vippsLogin(urlParamsObject)
        setDataFromVipps(userAuthInfo)
        if (userAuthInfo?.isAuth) {
          history.push(PATHS.UNAUTHENTICATED.LOGIN)
        }
      }

      processVippsLogin()
    }
  }, [history, isLoginCalled, urlParamsObject, vippsLogin])

  useEffect(() => {
    if (
      user?.data &&
      dataFromVipps?.bookingId &&
      !isBookingCalled &&
      !dataFromVipps?.isAuth
    ) {
      const processVippsBooking = async () => {
        try {
          setIsBookingCalled(true)

          // If user booked appointment from vipps in widget, update booking with user info
          await updateVippsBookingFromWidget({
            pendingBookingId: dataFromVipps.bookingId,
            clientPhone: dataFromVipps.phoneNumber,
            userId: user._id
          })
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
  }, [dataFromVipps, history, isBookingCalled, t, user])

  return dataFromVipps
}
export default useVippsFlowBackgroundActions
