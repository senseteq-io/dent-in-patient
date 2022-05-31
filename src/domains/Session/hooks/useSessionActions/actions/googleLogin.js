import 'firebase/compat/auth'

import firebase from 'firebase/compat/app'

const provider = new firebase.auth.GoogleAuthProvider()
// Add scopes here if necessary

const googleLogin = () =>
  firebase.auth.signInWithPopup(firebase.auth(), provider)

export default googleLogin
