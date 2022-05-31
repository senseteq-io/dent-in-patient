import firebase from 'firebase/compat/app'

/**
 * Send a password reset email to the user with the given email address.
 * @returns None
 */
const resetPassword = ({ email, onError }) =>
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .catch((err) => onError && onError(err))

export default resetPassword
