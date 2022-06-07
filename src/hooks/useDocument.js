import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import firestore from 'services/firebase/firestore'

const useDocument = (props) => {
  const [value, setValue] = useState()
  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const docRef = doc(firestore, props.ref)
        const querySnapshot = await getDoc(docRef)
        setValue(querySnapshot.data())
        setLoading(false)
      } catch (err) {
        setError(err)
      }
    }
    fetchData()
  }, [props?.ref])

  return [value, loading, error]
}

useDocument.propTypes = {
  ref: PropTypes.string.isRequired,
  where: PropTypes.array
}

export default useDocument
