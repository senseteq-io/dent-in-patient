import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

import firestore from 'services/firebase/firestore'

const baseSortRule = ['_createdAt', 'desc']

const useCollection = (props) => {
  const {
    ref: propsRef,
    where: propsWhere,
    orderBy: propsOrderBy,
    limit: propsLimit
  } = props
  const [value, setValue] = useState()
  const [loading, setLoading] = useState(!!propsRef)
  const [loadingMore, setLoadingMore] = useState()
  const [error, setError] = useState()
  const [lastVisible, setLastVisible] = useState()
  const [loadMoreAvailable, setLoadMoreAvailable] = useState(true)

  useEffect(() => {
    if (propsWhere?.length) {
      setLoadMoreAvailable(false)
    }
  }, [propsWhere])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const querySnapshot = propsWhere?.length
          ? query(
              collection(firestore, propsRef),
              ...propsWhere.map((rule) => where(...rule)),
              Array.isArray(propsOrderBy)
                ? orderBy(...propsOrderBy)
                : orderBy(...baseSortRule),
              limit(propsLimit)
            )
          : query(
              collection(firestore, propsRef),
              Array.isArray(propsOrderBy)
                ? orderBy(...propsOrderBy)
                : orderBy(...baseSortRule),
              limit(propsLimit)
            )
        onSnapshot(querySnapshot, (data) => {
          setLoading(true)
          const documents = data?.docs?.map((item) => item?.data())
          setValue(documents)
          if (propsLimit) {
            setLastVisible(data?.docs?.[data?.docs?.length - 1])
          }
          setLoading(false)
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        setError(err)
      }
    }
    !!propsRef && fetchData()
  }, [propsWhere, propsOrderBy, propsLimit, propsRef])

  const next = async () => {
    if (lastVisible) {
      setLoadingMore(true)
      const documents = []
      try {
        const querySnapshot = await getDocs(
          query(
            collection(firestore, propsRef),
            ...propsWhere.map((rule) => where(...rule)),
            Array.isArray(propsOrderBy)
              ? orderBy(...propsOrderBy)
              : orderBy(...baseSortRule),
            startAfter(lastVisible),
            limit(propsLimit)
          )
        )
        querySnapshot.forEach((doc) => documents.push(doc))
        setLastVisible(querySnapshot[querySnapshot.length - 1])
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        setError(err)
      }
      setValue((oldValue) => [
        ...oldValue,
        ...documents.map((doc) => doc.data())
      ])
      setLastVisible(documents?.[documents?.length - 1])
      setLoadingMore(false)
    }
  }

  return [value, loading, error, next, loadingMore, loadMoreAvailable]
}

export default useCollection

// import {
//   collection,
//   getDocs,
//   limit,
//   onSnapshot,
//   orderBy,
//   query,
//   startAfter,
//   where
// } from 'firebase/firestore'
// import { useEffect, useState } from 'react'

// import firestore from 'services/firebase/firestore'

// const baseSortRule = ['_createdAt', 'desc']

// const useCollection = (props) => {
//   const [value, setValue] = useState()
//   const [loading, setLoading] = useState(true)
//   const [loadingMore, setLoadingMore] = useState()
//   const [error, setError] = useState()
//   const [lastVisible, setLastVisible] = useState()
//   const [loadMoreAvailable, setLoadMoreAvailable] = useState(true)

//   useEffect(() => {
//     if (props?.where?.length) {
//       setLoadMoreAvailable(false)
//     }
//   }, [props?.where])

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true)
//       const documents = []
//       try {
//         const querySnapshot = props?.where?.length
//           ? query(
//               collection(firestore, props?.ref),
//               ...props?.where.map((rule) => where(...rule))
//             )
//           : query(
//               collection(firestore, props?.ref),
//               Array.isArray(props?.orderBy)
//                 ? orderBy(...props?.orderBy)
//                 : orderBy(...baseSortRule),
//               limit(props?.limit)
//             )
//         onSnapshot(querySnapshot, (data) => {
//           setLoading(true)
//           setValue(data.docs.map((item) => item?.data()))
//           setLoading(false)
//         })
//       } catch (err) {
//         setError(err)
//       }
//       setLastVisible(documents?.[documents?.length - 1])
//     }
//     fetchData()
//   }, [props?.where, props?.orderBy, props?.limit, props?.ref])

//   const next = async () => {
//     if (lastVisible) {
//       setLoadingMore(true)
//       const documents = []
//       try {
//         const querySnapshot = await getDocs(
//           query(
//             collection(firestore, props?.ref),
//             orderBy(props.orderBy),
//             startAfter(lastVisible),
//             limit(props?.limit)
//           )
//         )
//         querySnapshot.forEach((doc) => {
//           documents.push(doc)
//         })
//         setLastVisible(querySnapshot[querySnapshot.length - 1])
//       } catch (err) {
//         setError(err)
//       }
//       setValue((oldValue) => [
//         ...oldValue,
//         ...documents.map((doc) => doc.data())
//       ])
//       setLastVisible(documents?.[documents?.length - 1])
//       setLoadingMore(false)
//     }
//   }

//   return [value, loading, error, next, loadingMore, loadMoreAvailable]
// }

// export default useCollection
