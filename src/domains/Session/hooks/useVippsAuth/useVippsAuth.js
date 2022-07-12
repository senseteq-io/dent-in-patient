import PATHS from 'pages/paths'
import firebase from 'firebase/compat/app'
import { notification } from 'antd'
import { sendBackendRequest } from 'utils'
import { transformUserDataFromVipps } from 'domains/Session/helpers'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslations } from 'contexts/Translation'

// Vipps login part variables
const APP_URL = process.env.REACT_APP_URL
const { VIPPS_LOGIN_CALLBACK } = PATHS.UNAUTHENTICATED
const AUTH_MARKER = 'auth'
const VIPPS_AUTH_ENDPOINT = '/vipps/authorize'

const useVippsAuth = () => {
  const history = useHistory()
  const { t } = useTranslations()

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
      // Get access token and user data from vipps
      const { data } = await sendBackendRequest({
        endpoint: VIPPS_AUTH_ENDPOINT,
        body: requestData,
        errorDescription: t('Failed to get access token and data from vipps')
      })

      // Try to login user with auth token
      try {
        // If no token in response, it means that user didn`t authorize
        if (!data?.token) {
          throw new Error('No token in response')
        }
        const { user } = await firebase
          .auth()
          .signInWithCustomToken(data?.token)

        // If user successfully logged in, parse user data from vipps and return for next steps
        const userData = transformUserDataFromVipps({
          user,
          data,
          isAuth,
          state
        })
        return userData
      } catch (error) {
        notification.error({
          message: 'Error',
          description: t('Can not login user with vipps'),
          placement: 'topRight'
        })
        console.error(error)
        history.push('/auth')
      }
    },
    [history, t]
  )

  return vippsLogin
}

export default useVippsAuth
