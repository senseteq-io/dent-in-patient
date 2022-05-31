import { LS } from '__constants__'

/**
 * It takes in an object with email and avatarUrl properties and stores it in localStorage under the
key LS.SESSIONS.
 * @returns None
 */
const setSessionToLocalStorage = ({ email, avatarUrl }) => {
  let localStorageSessions = JSON.parse(localStorage.getItem(LS.SESSIONS))
  localStorage.setItem(LS.LAST_SESSION, JSON.stringify({ email, avatarUrl }))

  if (!localStorageSessions) localStorageSessions = []
  const isSessionAlreadyExists = Boolean(
    localStorageSessions.filter((session) => session.email === email).length
  )
  !isSessionAlreadyExists && localStorageSessions.push({ email, avatarUrl })
  localStorage.setItem(LS.SESSIONS, JSON.stringify(localStorageSessions))
}

export default setSessionToLocalStorage
