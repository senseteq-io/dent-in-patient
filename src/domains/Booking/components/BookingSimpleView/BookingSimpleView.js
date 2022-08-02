import {
  Avatar,
  Box,
  Button,
  Col,
  Container,
  Link,
  Row,
  Text,
  Title
} from '@qonsoll/react-design'
import {
  CalendarOutlined,
  ClockCircleOutlined,
  DownOutlined,
  EnvironmentOutlined,
  ExclamationOutlined,
  FileAddOutlined,
  MedicineBoxOutlined
} from '@ant-design/icons'
import { Popconfirm, notification } from 'antd'
import {
  StyledCollapse,
  StyledPanel,
  StyledRibbon
} from './BookingSimpleView.styled'
import { useGetBookingData, useGetBookingDate } from 'domains/Booking/hooks/get'
import { useMemo, useState } from 'react'

import { BookingEditModal } from 'domains/Booking/components'
import { CardDropdown } from 'components'
import { ClinicianAvatarIcon } from 'domains/Clinician/components'
import PropTypes from 'prop-types'
import { sendBackendRequest } from 'utils'
import { useTranslations } from 'contexts/Translation'

const BookingSimpleView = (props) => {
  const { booking } = props
  const { t } = useTranslations()
  // ADDITIONAL HOOKS
  const [clinician, treatment, clinic, addons] = useGetBookingData(booking)
  const [
    disabledCancelBtn,
    start,
    end,
    checkBookingStatus,
    changeBadgeColor,
    isCancelButtonVisible
  ] = useGetBookingDate(booking)

  const [isModalVisible, setIsModalVisible] = useState(false)

  const onEditBooking = () => {
    setIsModalVisible(true)
  }
  const handleModalCancel = () => {
    setIsModalVisible(false)
  }

  const handleBookingCancel = async () => {
    const cancelResponse = await sendBackendRequest({
      endpoint: `/bookings/${booking?._id}`,
      method: 'DELETE',
      errorDescription: t('Failed to cancel booking')
    })
    if (cancelResponse?.data?.booking === 'CANCELED') {
      notification.success({
        message: 'Success',
        description: t('Booking cancelled')
      })
    } else {
      notification.error({
        message: 'Error',
        description: t(
          'Booking can not be canceled less than 48 hours before the start time'
        )
      })
    }
  }

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
  const checkPriceIsZero = useMemo(
    () => (booking?.price === 0 ? t('free') : `${booking?.price},-`),
    [booking?.price, t]
  )
  return (
    <>
      <CardDropdown>
        <StyledRibbon text={t(checkBookingStatus)} color={changeBadgeColor}>
          <Container py="12px" height="100%">
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
                      {checkPriceIsZero}
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
                    alignItems="start"
                  >
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <ClockCircleOutlined />
                      <Text
                        ml={2}
                        variant="body2"
                        color="var(--ql-color-black-t-lighten2)"
                        style={{ fontWeight: '600', letterSpacing: '0.5px' }}
                      >
                        {t('Time')}
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
                    alignItems="start"
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
                      {props.booking?.date}
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
                      {clinic?.name}
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
                      overflow="hidden"
                      textOverflow="ellipsis"
                      maxWidth="250px"
                      whiteSpace="nowrap"
                    >
                      {clinic?.address1}
                    </Title>
                  </Col>
                </Row>
                {isCancelButtonVisible && (
                  <Row>
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
                        onConfirm={handleBookingCancel}
                        okButtonProps={{ danger: true }}
                        title={
                          <Text
                            variant="body1"
                            style={{
                              fontWeight: '600',
                              letterSpacing: '0.5px'
                            }}
                          >
                            {t('Cancel your booking?')}
                          </Text>
                        }
                      >
                        <Button
                          block
                          size="medium"
                          danger
                          type="text"
                          disabled={disabledCancelBtn}
                        >
                          {t('Cancel')}
                        </Button>
                      </Popconfirm>
                      {disabledCancelBtn && (
                        <Popconfirm
                          showCancel={false}
                          cancelText="No"
                          okButtonProps={{ danger: true }}
                          title={
                            <Box display="flex" flexDirection="column">
                              <Text
                                variant="body1"
                                style={{
                                  fontWeight: '600',
                                  letterSpacing: '0.5px'
                                }}
                              >
                                {t(
                                  'Booking can not be canceled less than 48 hours before the start time'
                                )}
                              </Text>
                              <Text
                                variant="body1"
                                style={{
                                  fontWeight: '600',
                                  letterSpacing: '0.5px'
                                }}
                              >
                                {t(
                                  'In case of an emergency contact us by phone:'
                                )}
                                <Link href={'tel:23651881'}>23651881</Link>
                              </Text>
                            </Box>
                          }
                        >
                          <Button ml={3} icon={<ExclamationOutlined />} />
                        </Popconfirm>
                      )}
                      <Button
                        block
                        size="medium"
                        type="text"
                        onClick={onEditBooking}
                      >
                        {t('Edit')}
                      </Button>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Container>
        </StyledRibbon>
      </CardDropdown>

      <BookingEditModal
        booking={booking}
        isModalVisible={isModalVisible}
        handleModalCancel={handleModalCancel}
      />
    </>
  )
}

BookingSimpleView.propTypes = {
  booking: PropTypes.object
}

export default BookingSimpleView
