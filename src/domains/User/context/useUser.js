import UserContext from './UserContext'
import { useContext } from 'react'

const useUser = () => useContext(UserContext)

export default useUser
