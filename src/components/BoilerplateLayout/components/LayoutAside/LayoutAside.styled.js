import { Aside, Box } from '@qonsoll/react-design'

import styled from 'styled-components'

export const StyledAside = styled(Aside)`
  border-radius: 24px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  margin: 8px;
  transition: 1s;
`
export const MenuCollapseWrapper = styled(Box)`
  top: 16px;
  position: absolute;
  left: ${({ asideLeftCollapsed }) => (asideLeftCollapsed ? '16px' : '242px')};
  transition: 1s;
  z-index: 3;
`
