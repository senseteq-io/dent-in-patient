import firebase from 'firebase/compat/app'
import { notification } from 'antd'

const PROD_API_URL = process.env.PROD_API_URL

const completeNewPassword = ({ password, userId }) => {
  //parse url params
  const urlParams = new URLSearchParams(window.location.search)
  const userEmail = urlParams.get('identifier')
  const requestData = {
    paswd: password
  }
  const requestBodyParametersFormatted = JSON.stringify(requestData)

  // for users with temporary password issue)
  return fetch(PROD_API_URL + `/user/${userId}/change`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: requestBodyParametersFormatted
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        notification.error({
          message: 'Error',
          description: 'Server responded with 404, cannot complete operation',
          placement: 'topRight'
        })
        return null
      }
    })
    .then((res) => {
      if (res && res.statusCode === 200) {
        // making force login with new password underhood
        firebase
          .auth()
          .signInWithEmailAndPassword(userEmail, password)
          .catch((error) => {
            notification.error({
              message: 'Error',
              description: error.message,
              placement: 'topRight'
            })
          })
      } else {
        console.log(res)
      }

      return res
    })
    .catch((error) => {
      console.error(error)
    })
}

export default completeNewPassword
