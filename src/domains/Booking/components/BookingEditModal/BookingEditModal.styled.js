import { Modal } from 'antd'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
  .ant-modal-header {
    border: none;
  }

  .ant-modal-footer {
    border: none;
  }

  .ant-modal-body::-webkit-scrollbar {
    display: none;
  }
  .ant-modal-header ::-webkit-scrollbar {
    display: none;
  }
`

export default StyledModal
