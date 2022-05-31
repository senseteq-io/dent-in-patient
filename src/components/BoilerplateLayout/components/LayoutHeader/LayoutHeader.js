import { Col, Container, Header, Row } from '@qonsoll/react-design'

import PropTypes from 'prop-types'

const LayoutHeader = ({ left, center, right }) => {
  return (
    <Header>
      <Container>
        <Row>
          <Col cw={2}>{left}</Col>
          <Col justifyContent="center">{center}</Col>
          <Col cw={2}>{right}</Col>
        </Row>
      </Container>
    </Header>
  )
}

LayoutHeader.propTypes = {
  center: PropTypes.element,
  left: PropTypes.element,
  right: PropTypes.element
}

export default LayoutHeader
