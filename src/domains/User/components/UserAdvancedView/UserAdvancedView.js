import { Avatar, Col, Row, Spin, Text, Title } from '@qonsoll/react-design'

import { Card } from 'antd'
import firebase from 'firebase/compat/app'
import { useAuthState } from 'react-firebase-hooks/auth'

const UserAdvancedView = () => {
  const [user, loading] = useAuthState(firebase.auth())

  return loading ? (
    <Spin />
  ) : (
    <Card>
      <Row h="center">
        <Col h="left" cw="auto">
          <Avatar h="left" size={[120, 140, 160]} src={user?.photoURL} />
        </Col>
        <Col v="center" h="left" cw={[12, 10, 10, 10]}>
          <Title level={4}>{user?.displayName}</Title>
          <Text ellipsis variant={'body2'}>
            {user?.email}
          </Text>
        </Col>
      </Row>
    </Card>
  )
}

export default UserAdvancedView
