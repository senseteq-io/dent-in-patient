import { deleteDoc, doc } from 'firebase/firestore'

import { firestore } from '../firebase'

const deleteDocument = async (collectionPath, id) => {
  const result = await deleteDoc(doc(firestore, collectionPath, id))
  return result
}

export default deleteDocument
