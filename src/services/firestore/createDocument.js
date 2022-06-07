import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

import { firestore } from '../firebase'
import { getId } from 'services/firestore'

const createDocument = async (collectionPath, documentData) => {
  const id = getId(collectionPath)
  const ref = doc(firestore, collectionPath, id)
  await setDoc(ref, { _id: id, ...documentData, _createdAt: serverTimestamp() })

  return { id }
}

export default createDocument
