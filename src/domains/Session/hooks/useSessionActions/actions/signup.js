import { LAST_SESSION_PROVIDERS, LS } from '__constants__'

import createUserWithEmailAndPassword from './createUserWithEmailAndPassword'
import sendEmailVerification from './sendEmailVerification'

/**
 * `signup` creates a new user with the given credentials, and then sends an email verification.
 * @returns A promise that resolves to the user object.
 */
const signup = ({ credentials, onError }) => {
  return createUserWithEmailAndPassword(credentials, onError).then(() => {
    localStorage.setItem(LS.LAST_SESSION_PROVIDER, LAST_SESSION_PROVIDERS.EMAIL)
    return sendEmailVerification(onError)
  })
}

export default signup
