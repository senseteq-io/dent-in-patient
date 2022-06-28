import {
  Box,
  Col,
  Container,
  Divider,
  Row,
  Text,
  Title
} from '@qonsoll/react-design'
import {
  CalendarOutlined,
  ClockCircleOutlined,
  DownOutlined,
  EnvironmentOutlined,
  FileAddOutlined,
  HourglassOutlined,
  MedicineBoxOutlined,
  MinusOutlined,
  UserOutlined,
  WalletOutlined
} from '@ant-design/icons'
import { Fragment, cloneElement } from 'react'
import { Skeleton, Tooltip } from 'antd'
import {
  StyledCollapse,
  StyledPanel
} from '../../components/BookingSimpleView/BookingSimpleView.styled'

import PropTypes from 'prop-types'
import { useTranslations } from 'contexts/Translation'

const BookingAdvancedView = (props) => {
  const {
    treatmentName,
    treatmentDuration,
    price,
    date,
    startTime,
    clinicianName,
    clinicAddress,
    addons
  } = props

  const { t } = useTranslations()

  const BOOKING_INFO = [
    {
      title: t('Treatment'),
      name: treatmentName,
      icon: <MedicineBoxOutlined />
    },
    {
      title: t('Location'),
      name: clinicAddress,
      icon: <EnvironmentOutlined />
    },
    {
      title: t('Date'),
      name: date,
      icon: <CalendarOutlined />
    },
    {
      title: t('Start'),
      name: startTime,
      icon: <ClockCircleOutlined />
    },
    {
      title: t('Duration'),
      name: treatmentDuration ? (
        `${treatmentDuration} ${t('minutes')}`
      ) : (
        <Skeleton.Input style={{ width: '100px', height: '20px' }} />
      ),
      icon: <HourglassOutlined />
    },
    {
      title: t('Clinician'),
      name: clinicianName,
      icon: <UserOutlined />
    },
    {
      title: t('Price'),
      name: price === 0 ? t('free') : price,
      icon: <WalletOutlined />
    }
  ]

  const checkAddonsAmount =
    addons?.length > 0 ? (
      <Text
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="28px"
      >
        {addons?.length}
        <DownOutlined style={{ fontSize: '12px' }} />
      </Text>
    ) : (
      '-'
    )

  return (
    <Container>
      {BOOKING_INFO.map(({ name, icon, title }, index) => (
        <Fragment key={`${name}-${index}`}>
          <Row noGutters h="between">
            <Col cw="auto" flexDirection="row" h="center">
              <Box mr="12px" display="flex" alignItems="center">
                {cloneElement(icon, {
                  size: 24,
                  fill: 'var(--ql-typography-text-color-secondary)'
                })}
              </Box>
              <Text color="var(--ql-typography-text-color-secondary)">
                {title}
              </Text>
            </Col>
            <Col
              cw="auto"
              maxWidth={['130px', '150px', '210px', '220px', '240px', '350px']}
            >
              <Tooltip title={name}>
                <Text isEllipsis cursor="default">
                  {name}
                </Text>
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Divider my={3} />
          </Row>
        </Fragment>
      ))}

      <Row noGutters>
        <Col>
          <StyledCollapse
            ghost
            bordered="false"
            style={{
              width: '100%'
            }}
          >
            <StyledPanel
              extra={checkAddonsAmount}
              showArrow="false"
              collapsible={addons?.length > 0}
              expandIconPosition="start"
              header={
                <Box display="flex" flexDirection="row" width="100%">
                  <FileAddOutlined />
                  <Text
                    ml={2}
                    variant="body2"
                    color="var(--ql-color-black-t-lighten2)"
                    style={{
                      fontWeight: '600',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {t('Addons:')}
                  </Text>
                </Box>
              }
            >
              {addons?.length > 0 ? (
                <Box>
                  {addons?.map((addon) => (
                    <Box key={addon?._i} display="flex" alignItems="center">
                      <MinusOutlined />
                      <Title
                        fontSize="14px"
                        style={{
                          fontWeight: '300',
                          letterSpacing: '0.5px',
                          wordBreak: 'break-word'
                        }}
                        level={5}
                        ml={2}
                      >
                        {addon?.title}
                      </Title>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Title
                  fontSize="14px"
                  style={{
                    fontWeight: '300',
                    letterSpacing: '0.5px',
                    wordBreak: 'break-word'
                  }}
                  level={5}
                  ml={2}
                >
                  {t('No addons')}
                </Title>
              )}
            </StyledPanel>
          </StyledCollapse>
        </Col>
      </Row>
    </Container>
  )
}

BookingAdvancedView.propTypes = {
  treatmentName: PropTypes.string,
  treatmentDuration: PropTypes.number,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  date: PropTypes.string,
  startTime: PropTypes.string,
  clinicianName: PropTypes.string,
  clinicAddress: PropTypes.string,
  addons: PropTypes.array
}

export default BookingAdvancedView
