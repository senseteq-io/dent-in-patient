import { Button, Form, Input, notification } from 'antd'

import PATHS from 'pages/paths'
import PropTypes from 'prop-types'
import { updateVippsBookingFromWidget } from 'domains/Booking/helpers'
import { useHistory } from 'react-router-dom'
import { useTranslations } from 'contexts/Translation'
import { useUserFormValidators } from 'domains/User/hooks'

const PROD_API_URL = process.env.REACT_APP_PROD_API_URL

const UserSimpleForm = (props) => {
  const { initialValues } = props

  const history = useHistory()
  const [form] = Form.useForm()
  const { t } = useTranslations()
  const { postalCodeValidator, personalNumberValidator } =
    useUserFormValidators()

  const onSubmitUser = async (userData) => {
    const userPhoneFormatted = initialValues?.phoneNumber
      ? `+${initialValues?.phoneNumber}`
      : null
    const userDataToUpdate = {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      postalCode: userData?.postalCode,
      phone: userPhoneFormatted,
      nin: userData?.personalNumber
    }

    try {
      // update user using our backend API
      await fetch(PROD_API_URL + `/user/${initialValues?.userId}`, {
        method: 'PATCH',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDataToUpdate)
      })
      if (!initialValues?.isAuth && initialValues?.bookingId) {
        // update pending booking from widget
        await updateVippsBookingFromWidget({
          pendingBookingId: initialValues?.bookingId,
          clientPhone: userPhoneFormatted,
          userId: initialValues?.userId
        })
      }

      history.push(PATHS.CONFIG.AFTER_LOGIN)
    } catch (e) {
      console.error('Error occurred during saving profile data. ', e.message)
      notification.error({
        message: t('Failed to save profile data'),
        description: e.message
      })
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmitUser}
      autoComplete="off"
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: t('Please enter your name!') }]}
      >
        <Input autoFocus placeholder={t('Please enter your name')} />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: t('Please enter your last name!') }]}
      >
        <Input placeholder={t('Please enter your last name')} />
      </Form.Item>
      <Form.Item
        label="Postal Code"
        name="postalCode"
        rules={[
          { required: true, message: t('Please enter your postal code!') },
          { validator: postalCodeValidator }
        ]}
      >
        <Input
          placeholder={t('Please enter your postal code')}
          maxLength={4}
          minLength={4}
        />
      </Form.Item>
      <Form.Item
        label="Personal Number"
        name="personalNumber"
        rules={[
          { required: true, message: t('Please enter your personal number!') },
          { validator: personalNumberValidator }
        ]}
      >
        <Input
          placeholder={t('Please enter your personal number')}
          maxLength={11}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        {t('Submit')}
      </Button>
    </Form>
  )
}

UserSimpleForm.propTypes = {
  initialValues: PropTypes.object
}

export default UserSimpleForm
