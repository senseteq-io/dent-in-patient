import {
  createUserWithEmailAndPassword,
  getLastSessionFromLocalStorage,
  getLastSessionProvider,
  googleLogin,
  login,
  resetPassword,
  completeNewPassword,
  saveUserToDB,
  sendEmailVerification,
  setSessionToLocalStorage,
  signup,
  updateEmailVerificationStatus,
  updateGDPRStatus
} from './actions'

const useSessionActions = () => {
  return {
    login,
    createUserWithEmailAndPassword,
    saveUserToDB,
    sendEmailVerification,
    signup,
    googleLogin,
    updateEmailVerificationStatus,
    updateGDPRStatus,
    resetPassword,
    completeNewPassword,
    setSessionToLocalStorage,
    getLastSessionFromLocalStorage,
    getLastSessionProvider
  }
}

export default useSessionActions
