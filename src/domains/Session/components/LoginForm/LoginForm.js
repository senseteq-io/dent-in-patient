import { Box, Button, Col, Input, Link, Row } from '@qonsoll/react-design'
import { useEffect, useState } from 'react'
import { useLastSession, useSessionActions } from 'domains/Session/hooks'

import { Form } from 'antd'
import { LastSessionUser } from 'domains/Session/components'
import PropTypes from 'prop-types'
// import { Input } from 'antd'
import { useQueryParams } from 'hooks'
import { useTranslations } from 'contexts/Translation'

const LoginForm = ({ login, onError, onForgotPasswordClick, ...rest }) => {
  const { t } = useTranslations()
  // [ADDITIONAL_HOOKS]
  /* Creating a state variable called loading and setting it to false. */
  const [loading, setLoading] = useState(false)
  /* Using the useLastSession hook to store the last session in the local storage. */
  const lastSession = useLastSession()
  /* Using the useSessionActions hook to get the last session provider. */
  const { getLastSessionProvider } = useSessionActions()
  const [form] = Form.useForm()

  // [CLEAN_FUNCTIONS]
  const isEmailExists = useQueryParams('email')

  const onFinish = async (credentials) => {
    /* Setting the loading state to true, then calling the login function, then setting the loading
    state to false. */
    setLoading(true)
    login({ credentials, onError })
    setLoading(false)
  }

  useEffect(() => {
    /* This code is setting the email field to the lastSession email if it exists. */
    if (lastSession.email) {
      form.setFieldsValue({ email: lastSession.email })
    }
  }, [form, lastSession.email])

  const sessionProvider = getLastSessionProvider()

  return (
    <Form form={form} onFinish={onFinish} {...rest}>
      <Form.Item
        name="email"
        hidden={isEmailExists && sessionProvider === 'email'}
        normalize={(value) => value.trim()}
        rules={[
          {
            type: 'email',
            required: true,
            message: t('Please enter valid email')
          }
        ]}
      >
        <Input size="large" autoFocus placeholder={t('Email')} />
      </Form.Item>
      {isEmailExists && sessionProvider === 'email' && (
        <LastSessionUser vertical lastSession={lastSession} />
      )}
      <Form.Item
        name="password"
        rules={[
          { required: true, message: t('Please, enter your password') },
          { min: 6, message: t('Password must be at least 6 characters') }
        ]}
      >
        <Input.Password
          size="large"
          autoFocus={isEmailExists}
          placeholder={t('Password')}
        />
      </Form.Item>
      <Row noGutters h="between" v="center">
        <Col cw="auto">
          <Box textAlign="center">
            <Link onClick={onForgotPasswordClick}>{t('Forgot password?')}</Link>
          </Box>
        </Col>
        <Col cw={6}>
          <Button
            block
            htmlType="submit"
            type="primary"
            size="large"
            loading={loading}
          >
            {t('Login')} 🚀
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

LoginForm.propTypes = {
  form: PropTypes.object,
  login: PropTypes.func.isRequired,
  onError: PropTypes.any.isRequired,
  onFinish: PropTypes.func,
  onFinishFailed: PropTypes.func,
  onForgotPasswordClick: PropTypes.func
}

export default LoginForm
