import firebase from 'firebase/compat/app'

/**
 * Send an email verification to the current user.
 * @param onError - a callback function that will be called if there is an error.
 * @returns None
 */
const verifyEmail = (onError) =>
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .catch((err) => {
      onError && onError(err)
    })

export default verifyEmail
