import createDocument from './createDocument'

/**
 * It takes a collection and an array of objects, creates a document for each object, and returns an
 * array of the document IDs
 * @param collection - The name of the collection you want to save the document to.
 * @param array - the array of objects to be saved
 * @returns An array of document ids
 */
const saveHasManyRelationship = async (collection, array) => {
  const promises = array.map(async (item) => {
    if (!item?._id) {
      const document = await createDocument(collection, item)
      return document.id
    } else {
      return item._id
    }
  })
  return Promise.all(promises)
}

export default saveHasManyRelationship
