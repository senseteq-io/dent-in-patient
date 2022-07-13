import { COLLECTIONS } from '__constants__'
import firebase from 'firebase/compat/app'
import { notification } from 'antd'
import { sendBackendRequest } from 'utils'
import { updateDocument } from 'services/firestore'

const completeNewPassword = async ({
  password,
  userEmail,
  userId,
  errorDescription
}) => {
  const requestData = {
    paswd: password
  }

  // update users temporary password to real password
  const updateClientPasswordResponse = await sendBackendRequest({
    endpoint: `/users/${userId}/change`,
    method: 'POST',
    body: requestData,
    errorDescription
  })

  if (updateClientPasswordResponse?.data === 'success') {
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
    updateDocument(COLLECTIONS.USERS, userId, {
      isTemporaryPasswordResolved: true
    })
  } else {
    notification.error({
      message: 'Error',
      description: errorDescription,
      placement: 'topRight'
    })
  }
  return updateClientPasswordResponse
}

export default completeNewPassword
