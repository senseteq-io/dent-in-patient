import { Col, Link, Row } from '@qonsoll/react-design'

import { LeftOutlined } from '@ant-design/icons'
import PATHS from 'pages/paths'
import { useHistory } from 'react-router-dom'
import { useTranslations } from 'contexts/Translation'

const ForgotPasswordFormExtension = () => {
  const { t } = useTranslations()
  // [ADDITIONAL HOOKS]
  const history = useHistory()

  // [CLEAN_FUNCTIONS]
  const redirectToLogin = () => history.push(PATHS.UNAUTHENTICATED.LOGIN)

  return (
    <Row noGutters v="center" h="center" mt={48}>
      <Col cw="auto" mr={1} color="var(--primary-color)">
        <LeftOutlined />
      </Col>
      <Col cw="auto">
        <Link type="link" onClick={redirectToLogin}>
          {t('Back to login')}
        </Link>
      </Col>
    </Row>
  )
}

export default ForgotPasswordFormExtension
