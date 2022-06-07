import { doc, updateDoc } from 'firebase/firestore'

import { firestore } from '../firebase'

const updateDocument = async (collectionPath, id, data) => {
  const ref = doc(firestore, collectionPath, id)
  return await updateDoc(ref, data)
}

export default updateDocument
