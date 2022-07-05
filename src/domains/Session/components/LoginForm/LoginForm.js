import { Box, Button, Col, Input, Link, Row } from '@qonsoll/react-design'
import { useEffect, useMemo, useState } from 'react'
import { useLastSession, useSessionActions } from 'domains/Session/hooks'

// import { COLLECTIONS } from '__constants__'
import { Form } from 'antd'
import { LastSessionUser } from 'domains/Session/components'
import PropTypes from 'prop-types'
// import { getDocument } from 'services/firestore'
import { getURLParameterValue } from 'utils'
import { useTranslations } from 'contexts/Translation'

// const { USERS } = COLLECTIONS

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

  //[COMPUTED PROPERTIES]
  const clientEmail = useMemo(() => getURLParameterValue('email'), [])
  const clientPassword = useMemo(() => getURLParameterValue('password'), [])
  // const clientId = useMemo(() => getURLParameterValue('userId'), [])
  const sessionProvider = getLastSessionProvider()

  const isLastSessionVisible = useMemo(
    () => !!clientEmail && !clientPassword && sessionProvider === 'email',
    [clientEmail, clientPassword, sessionProvider]
  )

  const isPasswordAutoFocusEnabled = useMemo(
    () => !!clientEmail && !clientPassword,
    [clientEmail, clientPassword]
  )

  const isEmailFieldVisible = useMemo(
    () => clientEmail && sessionProvider === 'email',
    [clientEmail, sessionProvider]
  )

  // [CLEAN_FUNCTIONS]
  const onFinish = async (credentials) => {
    setLoading(true)
    await login({ credentials, onError })
    // const userData = await getDocument(USERS, clientId)

    setLoading(false)
  }

  useEffect(() => {
    /* This code is setting the email field to the lastSession email if it exists. */
    if (lastSession.email && !clientPassword) {
      form.setFieldsValue({ email: lastSession.email })
    }
  }, [clientPassword, form, lastSession.email])

  //listen history change and set initial value from url params and auto login user
  useEffect(() => {
    if (clientEmail && clientPassword) {
      //set values from url params to form items
      form.setFieldsValue({ email: clientEmail })
      form.setFieldsValue({ password: clientPassword })

      //submit form to auto login user
      onFinish({ email: clientEmail, password: clientPassword })
    }
    //Disable unnecessary dependency warning for onFinish function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, clientEmail, clientPassword])

  return (
    <Form form={form} onFinish={onFinish} {...rest}>
      <Form.Item
        name="email"
        hidden={isEmailFieldVisible}
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
      {isLastSessionVisible && (
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
          autoFocus={isPasswordAutoFocusEnabled}
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
