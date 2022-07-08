import { LS } from '__constants__'

const getLastSessionFromLocalStorage = () => {
  /* Getting the last session from local storage and parsing it into a JavaScript object. */
  const lastSession = JSON.parse(localStorage.getItem(LS.LAST_SESSION))
  return lastSession || null
}

export default getLastSessionFromLocalStorage
