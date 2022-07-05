import firebase from 'firebase/compat/app'
import { notification } from 'antd'
import { updateDocument } from 'services/firestore'

const PROD_API_URL = process.env.REACT_APP_PROD_API_URL

const completeNewPassword = ({ password, userEmail, userId }) => {
  const requestData = {
    paswd: password
  }
  const requestBodyParametersFormatted = JSON.stringify(requestData)
  // update users temporary password to real password
  return fetch(PROD_API_URL + `/users/${userId}/change`, {
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
      if (res?.data === 'success') {
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
        updateDocument('users', userId, { isTemporaryPasswordResolved: true })
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
