import { Modal } from 'antd'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
  .ant-modal-header {
    border: none;
  }

  .ant-modal-footer {
    border: none;
  }

  &::-webkit-scrollbar {
    display: none !important;
  }
`

export default StyledModal
