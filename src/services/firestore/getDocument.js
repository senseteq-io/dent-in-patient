import { doc, getDoc } from 'firebase/firestore'

import { firestore } from '../firebase'

const getDocument = async (collectionPath, id) => {
  const ref = doc(firestore, collectionPath, id)
  const docSnapshot = await getDoc(ref)
  return docSnapshot.data()
}

export default getDocument
