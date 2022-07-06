import { Collapse } from 'antd'
import styled from 'styled-components'

const { Panel } = Collapse

export const StyledCollapse = styled(Collapse)`
  width: 100%;
  .ant-collapse-item {
    border: none;
  }
`

export const StyledPanel = styled(Panel)`
  .ant-collapse-content,
  .ant-collapse-content-active,
  .ant-collapse-content-box {
    background-color: transparent !important;
    width: 100%;
    padding-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .ant-collapse-item {
    border: none;
  }
`
