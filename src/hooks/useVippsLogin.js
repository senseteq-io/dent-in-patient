import { notification } from 'antd'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import PATHS from '../pages/paths'
import { updateVippsBookingFromWidget } from 'domains/Booking/helpers'
import { updateUserDataAfterVippsAuth } from 'domains/User/helpers'

// Vipps login part variables
const APP_URL = 'https://dent-in-client-prod.web.app'
const { VIPPS_LOGIN_CALLBACK } = PATHS.UNAUTHENTICATED
const PROD_API_URL = 'https://us-central1-dent-in-prod.cloudfunctions.net'

const useVippsLogin = () => {
  const history = useHistory()

  const vippsLogin = async (urlParamsObject) => {
    const { code, state } = urlParamsObject

    const requestData = {
      code: code,
      redirectUri: APP_URL + VIPPS_LOGIN_CALLBACK
    }

    const requestBodyParametersFormatted = JSON.stringify(requestData)
    // vipps auth
    try {
      const { data } = await (
        await fetch(PROD_API_URL + '/vipps/authorize', {
          method: 'POST',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json'
          },
          body: requestBodyParametersFormatted
        })
      ).json()

      if (!data?.token) {
        notification.error({
          message: 'Error',
          description: 'The user is not authorized!',
          placement: 'topRight'
        })
        history.push('/auth')
      } else {
        //get user to from auth, to pass into booking update
        const userAuthData = await firebase
          .auth()
          .signInWithCustomToken(data?.token)
        const user = userAuthData.user

        //update pending booking from widget
        await updateVippsBookingFromWidget({
          pendingBookingId: state,
          clientPhone: data?.phoneNumber,
          userId: user?.uid
        })
        if (userAuthData.additionalUserInfo.isNewUser) {
          updateUserDataAfterVippsAuth({
            userId: user?.uid,
            userData: data
          })
        }
        history.push('/auth')
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Something went wrong',
        data: error.message
      })
      history.push('/auth')
    }
  }

  return vippsLogin
}

export default useVippsLogin
