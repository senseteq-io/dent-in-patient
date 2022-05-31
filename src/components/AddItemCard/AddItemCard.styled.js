import PropTypes from 'prop-types'
import styled from 'styled-components'
const BlockWithHover = styled.div`
  width: 100%;
  height: 100%;
  transition: 0.3s;
  border-radius: 32px;
  &:hover {
    cursor: pointer;
    background-color: var(--ql-color-dark-t-lighten5);
  }
`
const Hover = (props) => {
  return <BlockWithHover>{props.children}</BlockWithHover>
}

Hover.propTypes = {
  children: PropTypes.node
}

export default Hover
