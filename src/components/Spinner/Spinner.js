import { Col, Container, Row } from '@qonsoll/react-design'

import { Spin } from 'antd'

const Spinner = () => {
  return (
    <Container py={6}>
      <Row h="center">
        <Col cw="auto">
          <Spin />
        </Col>
      </Row>
    </Container>
  )
}

export default Spinner
