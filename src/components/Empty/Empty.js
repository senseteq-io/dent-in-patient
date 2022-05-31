import { Button, Col, Container, Img, Row, Title } from '@qonsoll/react-design'

import { PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import noDataLogo from '../../assets/empty-svg.svg'
import { useTranslations } from 'contexts/Translation'

const Empty = (props) => {
  const { t } = useTranslations()

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Row>{<Img src={noDataLogo} alt="No data" height="240" />}</Row>
      <Row marginTop="24px">
        <Col>
          <Title level={4}>{t(props?.message || 'No data')}</Title>
        </Col>
      </Row>
      {props?.onCreateButtonClick ? (
        <Row marginTop="12px">
          <Col>
            <Button
              icon={<PlusOutlined />}
              onClick={props?.onCreateButtonClick}
              type="primary"
            >
              {t('Create')}
            </Button>
          </Col>
        </Row>
      ) : null}
    </Container>
  )
}

Empty.propTypes = {
  message: PropTypes.string,
  onCreateButtonClick: PropTypes.func,
  showImage: PropTypes.bool
}

export default Empty
