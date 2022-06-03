import { notification } from 'antd'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import PATHS from '../pages/paths'

// Vipps login part variables
const APP_URL = 'https://dent-in-client-prod.web.app'
const { VIPPS_LOGIN_CALLBACK } = PATHS.UNAUTHENTICATED
const PROD_API_URL = 'https://us-central1-dent-in-prod.cloudfunctions.net'

const useVippsLogin = () => {
  const history = useHistory()

  const vippsLogin = async (urlParamsObject) => {
    const { code } = urlParamsObject
    const requestData = {
      code: code,
      redirectUri: APP_URL + VIPPS_LOGIN_CALLBACK
    }

    const requestBodyParametersFormatted = JSON.stringify(requestData)
    // signupByVipps
    const vippsLogin = await fetch(PROD_API_URL + '/vipps/authorize', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBodyParametersFormatted
    }).then((data) => {
      if (data.ok) {
        return data.json()
      } else {
        // showing in app notification message
        notification.error({
          message: 'Error',
          description: 'Server responded with 404, cannot complete operation',
          data
        })
        history.push('/auth')
      }
      return null
    })

    // authorise the user
    if (!vippsLogin?.data?.token) {
      // showing in app notification message
      notification.error({
        message: 'Error',
        description: 'The user is not authorised!',
        placement: 'topRight'
      })
      history.push('/auth')
    } else {
      await firebase
        .auth()
        .signInWithCustomToken(vippsLogin?.data?.token)
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          notification.error({
            message: 'Error ' + errorCode,
            description: errorMessage,
            placement: 'topRight'
          })
          history.push('/auth')
        })
    }
  }

  return vippsLogin
}

export default useVippsLogin
