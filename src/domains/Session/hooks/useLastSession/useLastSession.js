import { useEffect, useState } from 'react'

import { useSessionActions } from 'domains/Session/hooks'

const useLastSession = () => {
  /* 
    - The useEffect hook is used to run a function when a component is mounted and when the component
      is updated. 
    - The useState hook is used to create a state variable and set its initial value. 
    - The useSessionActions hook is used to create a function that can be used to get the last session
      from local storage. 
    - The useEffect hook is used to run a function when a component is mounted and when the component is
      updated. 
    - The useState hook is used to create a state variable and set its initial value.
  */
  const { getLastSessionFromLocalStorage } = useSessionActions()
  const [lastSession, setLastSession] = useState(false)
  useEffect(() => {
    const lastSession = getLastSessionFromLocalStorage()
    setLastSession(lastSession)
  }, [getLastSessionFromLocalStorage])

  return lastSession
}

export default useLastSession
