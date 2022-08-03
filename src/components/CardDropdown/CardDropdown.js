import {
  DeleteOutlined,
  EditOutlined,
  FolderOpenOutlined
} from '@ant-design/icons'
import { Dropdown, Menu, MenuItem } from '@qonsoll/react-design'

import PropTypes from 'prop-types'
import { useTranslations } from 'contexts/Translation'

const CardDropdown = ({ handleEdit, handleDelete, handleOpen, children }) => {
  const { t } = useTranslations()

  return (
    <Dropdown
      trigger={'contextMenu'}
      overlay={
        <Menu>
          {handleOpen ? (
            <MenuItem
              key="edit"
              icon={<FolderOpenOutlined />}
              onClick={(event) => {
                event.domEvent.stopPropagation()
                handleOpen?.()
              }}
            >
              {t('Open')}
            </MenuItem>
          ) : null}
          {handleEdit ? (
            <MenuItem
              key="edit"
              icon={<EditOutlined />}
              onClick={(event) => {
                event.domEvent.stopPropagation()
                handleEdit?.()
              }}
            >
              {t('Edit')}
            </MenuItem>
          ) : null}
          {handleDelete ? (
            <MenuItem
              key="delete"
              icon={<DeleteOutlined />}
              danger
              onClick={(event) => {
                event.domEvent.stopPropagation()
                handleDelete?.()
              }}
            >
              {t('Delete')}
            </MenuItem>
          ) : null}
        </Menu>
      }
    >
      {children}
    </Dropdown>
  )
}

CardDropdown.propTypes = {
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  handleOpen: PropTypes.func,
  children: PropTypes.node.isRequired
}

export default CardDropdown
