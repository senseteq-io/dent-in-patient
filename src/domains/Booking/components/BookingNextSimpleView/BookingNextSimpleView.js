import {
  Avatar,
  Box,
  Card,
  Col,
  Container,
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
  UserOutlined,
  WalletOutlined
} from '@ant-design/icons'
import {
  StyledCollapse,
  StyledPanel
} from '../BookingSimpleView/BookingSimpleView.styled'

import { ClinicianAvatarIcon } from 'domains/Clinician/components'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts/Translation'

const BookingNextSimpleView = (props) => {
  const {
    treatmentName,
    price,
    date,
    startTime,
    endTime,
    clinicianName,
    clinicianTitle,
    clinicianAvatarUrl,
    clinicName,
    clinicCity,
    clinicAddress,
    addons
  } = props
  const { t } = useTranslations()

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

  const cityNameFirlstCapitalise =
    clinicCity?.toLowerCase().charAt(0).toUpperCase() +
    clinicCity?.toLowerCase().slice(1)

  return (
    <Card bordered={false}>
      <Container>
        <Row height="100%">
          <Col justifyContent="space-between" height="100%" cw={12}>
            <Row noGutters h="between">
              {/* booking name */}
              <Col>
                <Title wordBreak="break-word" level={4}>
                  {treatmentName}
                </Title>
              </Col>
              {/* booking price  */}
              <Col cw="auto">
                <Title wordBreak="break-word" variant="h5">
                  {price}
                </Title>
              </Col>
            </Row>

            <Row noGutters my={4} flexDirection="column">
              <Col flexWrap="nowrap" flexDirection="row" h="center">
                <Avatar
                  mr={3}
                  size="40px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  icon={
                    <ClinicianAvatarIcon variant="body2" name={clinicianName} />
                  }
                  src={clinicianAvatarUrl}
                />
                <Box display="flex" flexDirection="column">
                  <Title
                    style={{ fontWeight: '300' }}
                    level={5}
                    wordBreak="break-word"
                    mb={0}
                  >
                    {clinicianName}
                  </Title>
                  <Text
                    textTransform="uppercase"
                    variant="caption2"
                    color="var(--ql-color-black-t-lighten2)"
                    style={{ fontWeight: '700', letterSpacing: '0.5px' }}
                  >
                    {clinicianTitle}
                  </Text>
                </Box>
              </Col>
            </Row>

            <Row
              noGutters
              mb={3}
              flexDirection="column"
              style={{ gap: '16px' }}
            >
              {/* Addons */}
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
                          <Title
                            key={addon.name}
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
              <Col
                display="flex"
                v="between"
                flexDirection="row"
                alignItems="end"
              >
                <Box display="flex" flexDirection="row" alignItems="center">
                  <ClockCircleOutlined />
                  <Text
                    ml={2}
                    variant="body2"
                    color="var(--ql-color-black-t-lighten2)"
                    style={{ fontWeight: '600', letterSpacing: '0.5px' }}
                  >
                    Time
                  </Text>
                </Box>

                <Title
                  fontSize="14px"
                  style={{ fontWeight: '300', letterSpacing: '0.5px' }}
                  level={5}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  maxWidth="250px"
                  whiteSpace="nowrap"
                  ml={2}
                >
                  {startTime} - {endTime}
                </Title>
              </Col>

              <Col
                cw="auto"
                display="flex"
                v="between"
                flexDirection="row"
                alignItems="end"
              >
                <Box display="flex" alignItems="center">
                  <CalendarOutlined />
                  <Text
                    variant="body2"
                    color="var(--ql-color-black-t-lighten2)"
                    style={{ fontWeight: '600', letterSpacing: '0.5px' }}
                    ml={2}
                  >
                    {t('Date')}
                  </Text>
                </Box>
                <Title
                  fontSize="14px"
                  style={{ fontWeight: '300', letterSpacing: '0.5px' }}
                  level={5}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  maxWidth="250px"
                  whiteSpace="nowrap"
                >
                  {date}
                </Title>
              </Col>

              <Col
                cw="auto"
                display="flex"
                v="between"
                flexDirection="row"
                alignItems="start"
              >
                <Box display="flex" alignItems="center">
                  <MedicineBoxOutlined />
                  <Text
                    variant="body2"
                    color="var(--ql-color-black-t-lighten2)"
                    style={{ fontWeight: '600', letterSpacing: '0.5px' }}
                    ml={2}
                  >
                    {t('Clinic')}
                  </Text>
                </Box>
                <Title
                  fontSize="14px"
                  style={{ fontWeight: '300', letterSpacing: '0.5px' }}
                  level={5}
                  textAlign="right"
                  overflow="hidden"
                  maxWidth={['250px', '350px']}
                  wordBreak="break-word"
                >
                  {clinicName}
                </Title>
              </Col>
              <Col
                cw="auto"
                display="flex"
                v="between"
                flexDirection="row"
                alignItems="start"
              >
                <Box display="flex" alignItems="center">
                  <EnvironmentOutlined />
                  <Text
                    variant="body2"
                    color="var(--ql-color-black-t-lighten2)"
                    style={{ fontWeight: '600', letterSpacing: '0.5px' }}
                    ml={2}
                  >
                    {t('Clinic address')}
                  </Text>
                </Box>
                <Title
                  fontSize="14px"
                  style={{ fontWeight: '300', letterSpacing: '0.5px' }}
                  level={5}
                  textAlign="right"
                  wordBreak="break-word"
                  maxWidth={['250px', '350px']}
                >
                  {clinicAddress},{cityNameFirlstCapitalise}
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Card>
  )
}

BookingNextSimpleView.propTypes = {
  treatmentName: PropTypes.string,
  treatmentDuration: PropTypes.number,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  date: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  clinicianName: PropTypes.string,
  clinicianTitle: PropTypes.string,
  clinicianAvatarUrl: PropTypes.string,
  clinicName: PropTypes.string,
  clinicCity: PropTypes.string,
  clinicAddress: PropTypes.string,
  addons: PropTypes.array
}

export default BookingNextSimpleView
