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
  EnvironmentOutlined,
  MedicineBoxOutlined
} from '@ant-design/icons'

import { CardDropdown } from 'components'
import { ClinicianAvatarIcon } from 'domains/Clinician/components'
import PropTypes from 'prop-types'
import firebase from 'firebase/compat/app'
import moment from 'moment'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { useHistory } from 'react-router-dom'
import { Popconfirm } from 'antd'

const blockSelectStyles = { userSelect: 'none', cursor: 'pointer' }

const BookingSimpleView = (props) => {
  const { booking } = props

  const history = useHistory()

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

  const handleEdit = () => history.push(`/bookings/${booking?._id}/edit`)
  const handleOpen = () => history.push(`/bookings/${booking?._id}`)

  const start = moment(booking?.start).format('HH:mm')
  const end = moment(booking?.end).format('HH:mm')

  return (
    <CardDropdown handleEdit={handleEdit}>
      <Container style={blockSelectStyles} onDoubleClick={handleOpen} py="12px">
        <Row>
          <Col justifyContent="center" cw={12}>
            <Row noGutters h="between" mb={3}>
              <Col>
                <Title
                  overflow="hidden"
                  textOverflow="ellipsis"
                  maxWidth="250px"
                  whiteSpace="nowrap"
                  level={4}
                >
                  {treatment?.name}
                </Title>
              </Col>
              <Col cw="auto">
                <Title
                  overflow="hidden"
                  textOverflow="ellipsis"
                  maxWidth="250px"
                  whiteSpace="nowrap"
                  variant="h5"
                >
                  {props?.booking?.price},-
                </Title>
              </Col>
            </Row>

            <Row noGutters mb={3}>
              <Col flexWrap="nowrap" flexDirection="row" h="center">
                <Avatar
                  mr={3}
                  size="32px"
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
                  <Text
                    textTransform="uppercase"
                    variant="caption2"
                    color="var(--ql-color-black-t-lighten2)"
                    style={{ fontWeight: '700', letterSpacing: '0.5px' }}
                  >
                    {clinician?.title}
                  </Text>
                  <Title
                    style={{ fontWeight: '300' }}
                    level={5}
                    display="flex"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    maxWidth="250px"
                    whiteSpace="nowrap"
                    mb={0}
                  >
                    {clinician?.name}
                  </Title>
                </Box>
              </Col>
            </Row>

            <Row noGutters mb={2} flexDirection="column" h="center">
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
                  overflow="hidden"
                  textOverflow="ellipsis"
                  maxWidth="250px"
                  whiteSpace="nowrap"
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
              <Col
                cw="auto"
                display="flex"
                v="between"
                flexDirection="row"
                alignItems="end"
                mt={2}
              >
                <Popconfirm
                  okText="Yes"
                  cancelText="No"
                  // onCancel={handleCancel}
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
