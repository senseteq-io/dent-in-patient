import createDocument from './createDocument'

/**
 * It creates a new document in the collection and returns the id of the newly created document
 * @param collection - The name of the collection you want to save the data to.
 * @param data - The data to be saved
 * @returns The id of the newly created document.
 */
const saveBelongsToRelationship = async (collection, data) => {
  const { id } = await createDocument(collection, data)
  return id
}

export default saveBelongsToRelationship
