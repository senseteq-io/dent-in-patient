import { Badge, Collapse } from 'antd'

import styled from 'styled-components'

const { Panel } = Collapse

export const StyledPanel = styled(Panel)``

export const StyledCollapse = styled(Collapse)`
  &.ant-collapse .ant-collapse-item .ant-collapse-header {
    padding: 0;
  }
  &.ant-collapse
    > .ant-collapse-item
    > .ant-collapse-header
    .ant-collapse-arrow {
    display: none;
  }
  &.ant-collapse > .ant-collapse-item > .ant-collapse-header::before {
    display: none;
  }
`
export const StyledRibbon = styled(Badge.Ribbon)`
  top: 40px;
  border-top-left-radius: var(--ql-border-radius-md);
  border-bottom-left-radius: var(--ql-border-radius-md);
  border-top-right-radius: var(--ql-border-radius-md);
`
