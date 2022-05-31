import { LAST_SESSION_PROVIDERS, LS } from '__constants__'

import firebase from 'firebase/compat/app'

const createUserWithEmailAndPswd = (credentials, onError) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      localStorage.setItem(
        LS.LAST_SESSION_PROVIDER,
        LAST_SESSION_PROVIDERS.EMAIL
      )
    })
    .catch((err) => {
      onError && onError(err)
    })
}

export default createUserWithEmailAndPswd
