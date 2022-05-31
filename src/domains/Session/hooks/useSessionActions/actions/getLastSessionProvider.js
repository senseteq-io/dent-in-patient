import { LS } from '__constants__'

/**
 * Get the last session provider from local storage.
 * @returns The last session provider.
 */
const getLastSessionProvider = () => {
  const lastSessionProvider = localStorage.getItem(LS.LAST_SESSION_PROVIDER)
  return lastSessionProvider || false
}

export default getLastSessionProvider
