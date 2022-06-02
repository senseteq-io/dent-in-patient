import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { urlParamsToObject } from '../../utils'
import { useVippsLogin } from '../../hooks'
import { Col, PageWrapper, Row } from '@qonsoll/react-design'
import { Spin } from 'antd'

const VippsCallback = () => {
  const [isLoginCalled, setIsLoginCalled] = useState(false)
  // [ADDITIONAL HOOKS]
  const location = useLocation()
  const urlParamsObject = urlParamsToObject(location.search)
  const history = useHistory()
  const vippsLogin = useVippsLogin()

  // Vipps login
  useEffect(() => {
    if (!isLoginCalled && urlParamsObject?.code) {
      setIsLoginCalled(true)
      vippsLogin(urlParamsObject)
    }
  }, [urlParamsObject, vippsLogin, isLoginCalled, history])

  return (
    <PageWrapper
      alignMiddle
      height="100%"
      headingProps={{
        title: 'Processing Vipps login...',
        subTitle:
          'Your account is being verified, please wait, the process will not take more than 10 seconds',
        marginBottom: 40
      }}
      contentWidth={['100%', '100%', 400]}
    >
      <Row h="center">
        <Col cw="12" mb={3}>
          <Spin size="large" spinning />
        </Col>
      </Row>
    </PageWrapper>
  )
}
export default VippsCallback
