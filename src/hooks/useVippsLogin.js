import PATHS from '../pages/paths'
import firebase from 'firebase/compat/app'
import { notification } from 'antd'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

// Vipps login part variables
const APP_URL = process.env.REACT_APP_URL
const { VIPPS_LOGIN_CALLBACK } = PATHS.UNAUTHENTICATED
const PROD_API_URL = process.env.REACT_APP_PROD_API_URL
const AUTH_MARKER = 'auth'

const useVippsLogin = () => {
  const history = useHistory()

  const vippsLogin = useCallback(
    async (urlParamsObject) => {
      const { code, state } = urlParamsObject
      // For in app vipps auth add marker 'auth' to state
      // to differentiate from widget auth and skip booking update
      // if it just auth from login page
      const [inAppAuthMarker] = state.split('_') //when it`s just auth state is in the form of auth_{generatedUserId}
      const isAuth = inAppAuthMarker === AUTH_MARKER

      const requestData = {
        code: code,
        redirectUri: APP_URL + VIPPS_LOGIN_CALLBACK
      }

      const requestBodyParametersFormatted = JSON.stringify(requestData)

      try {
        // Get access token and user data from vipps
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
          const { user } = await firebase
            .auth()
            .signInWithCustomToken(data?.token)

          //convert user personal number from object to string if exists
          const { day, month, year, extraDigits } = data?.personalNumber || {}
          const shortYear = year?.substring(2) || ''
          const isPersonalNumberPassed = [
            day,
            month,
            shortYear,
            extraDigits
          ].every((part) => !!part)
          const userPersonalNumber = isPersonalNumberPassed
            ? `${day}${month}${shortYear}${extraDigits}`
            : ''

          const userPhoneNumber = data?.phoneNumber
            ? `+${data?.phoneNumber}`
            : null
          // format object with necessary user data
          const userData = {
            userId: user?.uid,
            firstName: data?.givenName,
            lastName: data?.familyName,
            postalCode: data?.address?.postalCode,
            phoneNumber: userPhoneNumber,
            email: data?.email,
            personalNumber: userPersonalNumber,
            bookingId: isAuth ? null : state,
            isAuth
          }
          return userData
        }
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Can not login user!',
          data: error.message
        })
        console.error(error)
        history.push('/auth')
      }
    },
    [history]
  )

  return vippsLogin
}

export default useVippsLogin
