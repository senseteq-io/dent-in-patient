import { LAST_SESSION_PROVIDERS, LS } from '__constants__'

import firebase from 'firebase/compat/app'

/**
 * It takes in a `credentials` object and a `onError` callback. It then uses the `firebase.auth()`
method to sign in with the email and password provided. If the sign in is successful, it sets the
`LAST_SESSION_PROVIDER` in local storage to `LAST_SESSION_PROVIDERS.EMAIL`. If the sign in fails, it
calls the `onError` callback with the error.
 * @returns A promise.
 */
const login = ({ credentials, onError }) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then((userAuthData) => {
      localStorage.setItem(
        LS.LAST_SESSION_PROVIDER,
        LAST_SESSION_PROVIDERS.EMAIL
      )

      return userAuthData
    })
    .catch((err) => {
      onError && onError(err)
    })
}

export default login
