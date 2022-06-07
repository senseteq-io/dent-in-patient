import { collection, doc } from 'firebase/firestore'

import { firestore } from '../firebase'

const getId = (collectionPath) => {
  const ref = doc(collection(firestore, collectionPath))
  return ref.id
}

export default getId
