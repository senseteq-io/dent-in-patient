import { notification } from 'antd'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import PATHS from '../pages/paths'

// Vipps login part variables
const APP_URL = process.env.REACT_APP_URL
const { VIPPS_LOGIN_CALLBACK } = PATHS.UNAUTHENTICATED
const PROD_API_URL = process.env.REACT_APP_PROD_API_URL

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
        const { user } = await firebase
          .auth()
          .signInWithCustomToken(data?.token)

        return { userId: user?.uid, ...data, bookingId: state }
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
