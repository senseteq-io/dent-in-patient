import { Button, Input } from '@qonsoll/react-design'

import { Form } from 'antd'
import PATHS from 'pages/paths'
import PropTypes from 'prop-types'
import { message } from 'antd'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useTranslations } from 'contexts/Translation'

const ForgotPasswordForm = ({ resetPassword, onError }) => {
  const { t } = useTranslations()
  // [ADDITIONAL_HOOKS]
  const history = useHistory()

  // [COMPONENT_STATE]
  const [loading, setLoading] = useState(false)

  // [CLEAN_FUNCTIONS]
  const onFinish = (credentials) => {
    /* 
      The `resetPassword` function is called with the user's email address.
      The `onError` function is called if the request fails.
      The `message.success` function is called to display a success message.
      The `setLoading` function is called to set the loading state to false.
      The `history.push` function is called to redirect the user to the login page.
    */
    setLoading(true)
    resetPassword({ email: credentials.email, onError })
    message.success(t('Reset password was sent to your email'))
    setLoading(false)
    history.push(PATHS.UNAUTHENTICATED.LOGIN)
  }

  return (
    <Form size="large" onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            required: true,
            message: t('Please enter valid email')
          }
        ]}
      >
        <Input
          autoFocus
          placeholder={t('Enter your account email')}
          textAlign="center"
        />
      </Form.Item>
      <Button type="primary" block htmlType="submit" loading={loading}>
        {t('Restore Password')}
      </Button>
    </Form>
  )
}

ForgotPasswordForm.propTypes = {
  form: PropTypes.object,
  onError: PropTypes.any.isRequired,
  onFinish: PropTypes.func,
  onFinishFailed: PropTypes.func,
  resetPassword: PropTypes.func.isRequired
}
export default ForgotPasswordForm
