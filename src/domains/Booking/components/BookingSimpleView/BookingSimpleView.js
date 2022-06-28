import {
  Avatar,
  Box,
  Button,
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
  MedicineBoxOutlined
} from '@ant-design/icons'
import { Popconfirm, notification } from 'antd'
import { StyledCollapse, StyledPanel } from './BookingSimpleView.styled'
import {
  useCollectionData,
  useDocumentDataOnce
} from 'react-firebase-hooks/firestore'

import { CardDropdown } from 'components'
import { ClinicianAvatarIcon } from 'domains/Clinician/components'
import PropTypes from 'prop-types'
import firebase from 'firebase/compat/app'
import moment from 'moment'
// import { useHistory } from 'react-router-dom'
import { useMemo } from 'react'
import { useTranslations } from 'contexts/Translation'

// const blockSelectStyles = {
//   userSelect: 'none',
//   cursor: 'pointer',
//   height: '100%'
// }

const PROD_API_URL = process.env.PROD_API_URL

const BookingSimpleView = (props) => {
  const { booking } = props
  // const history = useHistory()
  const { t } = useTranslations()

  const [clinician] = useDocumentDataOnce(
    firebase
      .firestore()
      .collection('clinicians')
      .doc(booking?.clinicianId?.toString())
  )

  const [treatment] = useDocumentDataOnce(
    firebase
      .firestore()
      .collection('treatments')
      .doc(booking?.treatmentId?.toString())
  )

  const [clinic] = useDocumentDataOnce(
    firebase
      .firestore()
      .collection('clinics')
      .doc(booking?.clinicId?.toString())
  )
  const [addons] = useCollectionData(
    booking?.addons?.length &&
      firebase
        .firestore()
        .collection('treatments')
        .doc(treatment?._id?.toString())
        .collection('treatmentsAddons')
        .where('_id', 'in', booking?.addons)
  )

  const handleBookingCancel = async () => {
    const response = await fetch(PROD_API_URL + `/bookings/${booking?._id}`, {
      method: 'DELETE',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      notification.success({
        message: 'Success',
        description: 'Booking cancelled'
      })
    } else {
      notification.error({
        message: 'Error',
        description: 'Server responded with 404, cannot complete operation'
      })
    }
  }
  // const handleEdit = () => history.push(`/bookings/${booking?._id}/edit`)
  // const handleOpen = () => history.push(`/bookings/${booking?._id}`)

  const start = useMemo(() => moment(booking?.start).format('HH:mm'), [booking])
  const end = useMemo(() => moment(booking?.end).format('HH:mm'), [booking])
  const isCancelButtonVisible = useMemo(
    () => moment(booking?.start).isAfter(moment()),
    [booking]
  )

  const checkAddonsAmount =
    addons?.length > 0 ? (
      <Text
        display="flex"
        alignItems="center"
        width="28px"
        justifyContent="space-between"
      >
        {addons?.length}
        <DownOutlined style={{ fontSize: '10px' }} />
      </Text>
    ) : (
      '-'
    )
  return (
    <CardDropdown
    // temporary disabled - not sure or pacient has permission to edit
    // handleEdit={handleEdit}
    >
      <Container
        // style={blockSelectStyles}
        // temporary disabled - not sure or pacient has permission to edit
        // onDoubleClick={handleOpen}
        py="12px"
      >
        <Row height="100%">
          <Col justifyContent="space-between" height="100%" cw={12}>
            <Row noGutters h="between">
              {/* booking name */}
              <Col>
                <Title wordBreak="break-word" level={4}>
                  {treatment?.name}
                </Title>
              </Col>
              {/* booking price  */}
              <Col cw="auto">
                <Title wordBreak="break-word" variant="h5">
                  {props?.booking?.price},-
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
                    <ClinicianAvatarIcon
                      variant="body2"
                      name={clinician?.name}
                    />
                  }
                  src={clinician?.avatarUrl}
                />
                <Box display="flex" flexDirection="column">
                  <Title
                    style={{ fontWeight: '300' }}
                    level={5}
                    wordBreak="break-word"
                    mb={0}
                  >
                    {clinician?.name}
                  </Title>
                  <Text
                    textTransform="uppercase"
                    variant="caption2"
                    color="var(--ql-color-black-t-lighten2)"
                    style={{ fontWeight: '700', letterSpacing: '0.5px' }}
                  >
                    {clinician?.title}
                  </Text>
                </Box>
              </Col>
            </Row>

            <Row noGutters mb={3} flexDirection="column" style={{ gap: '8px' }}>
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
                  {start} - {end}
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
                    Date
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
                  {props.booking?.date}
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
                  <MedicineBoxOutlined />
                  <Text
                    variant="body2"
                    color="var(--ql-color-black-t-lighten2)"
                    style={{ fontWeight: '600', letterSpacing: '0.5px' }}
                    ml={2}
                  >
                    Clinic
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
                  {clinic?.name}
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
                  <EnvironmentOutlined />
                  <Text
                    variant="body2"
                    color="var(--ql-color-black-t-lighten2)"
                    style={{ fontWeight: '600', letterSpacing: '0.5px' }}
                    ml={2}
                  >
                    Clinic address
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
                  {clinic?.address1}
                </Title>
              </Col>
            </Row>
            <Row>
              {isCancelButtonVisible && (
                <Col
                  cw="12"
                  display="flex"
                  v="between"
                  flexDirection="row"
                  alignItems="end"
                  mt={2}
                >
                  <Popconfirm
                    okText="Yes"
                    cancelText="No"
                    onCancel={handleBookingCancel}
                    okButtonProps={{ danger: true }}
                    title={
                      <Text
                        variant="body1"
                        style={{ fontWeight: '600', letterSpacing: '0.5px' }}
                      >
                        Cancel yours booking?
                      </Text>
                    }
                  >
                    <Button block size="medium" danger type="text">
                      Cancel
                    </Button>
                  </Popconfirm>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </CardDropdown>
  )
}

BookingSimpleView.propTypes = {
  booking: PropTypes.object
}

export default BookingSimpleView
