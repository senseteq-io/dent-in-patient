import { deleteDocument, updateDocument } from 'services/firestore'

import { message } from 'antd'

const useSimpleFormActions = ({
  form,
  changeStateAction,
  document,
  collectionName
}) => {
  const handleCancel = () => {
    changeStateAction(false)
    form.resetFields()
  }

  const handleEdit = () => changeStateAction(true)

  const handleSave = () => {
    updateDocument(collectionName, document._id, form.getFieldsValue())
      .then(() => message.success('Document successfully updated'))
      .catch((error) => message.error(error.message))
    changeStateAction(false)
    form.resetFields()
  }

  const handleDelete = () =>
    deleteDocument(collectionName, document._id)
      .then(() => message.success('Document successfully deleted'))
      .catch((error) => message.error(error.message))

  return { handleCancel, handleEdit, handleSave, handleDelete }
}

export default useSimpleFormActions
