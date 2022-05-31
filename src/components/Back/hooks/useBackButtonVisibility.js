import { useEffect, useState } from 'react'

import { DISABLED_BACK_ROUTES } from '../__constants__'
import { useHistory } from 'react-router-dom'

const useBackButtonVisibility = () => {
  const history = useHistory()
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false)

  useEffect(() => {
    /* This code is checking if the current route is in the DISABLED_BACK_ROUTES array. */
    const isDisabledRoute = DISABLED_BACK_ROUTES.includes(
      history.location.pathname
    )
    setIsBackButtonVisible(!isDisabledRoute)
  }, [history.location.pathname])

  return isBackButtonVisible
}

export default useBackButtonVisibility
