import { Button, Checkbox, Form, Input } from 'antd'

import { Link } from 'react-router-dom'
import PATHS from 'pages/paths'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useTranslations } from 'contexts/Translation'

const SignupForm = ({ signup, onError, ...rest }) => {
  const { t } = useTranslations()
  // [COMPONENT_STATE]
  const [loading, setLoading] = useState(false)

  // [CLEAN_FUNCTIONS]
  const onFinish = (credentials) => {
    /* Setting the loading state to true, then calling the signup function, then setting the loading
    state to false. */
    setLoading(true)
    signup({ credentials, onError })
    setLoading(false)
  }

  return (
    <Form onFinish={onFinish} {...rest}>
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
        <Input size="large" autoFocus placeholder={t('Email')} />
      </Form.Item>
      <Form.Item
        name="password"
        hasFeedback
        rules={[
          { required: true, message: t('Please, enter your password') },
          { min: 6, message: t('Password must be at least 6 characters') }
        ]}
      >
        <Input.Password size="large" placeholder={t('Password')} />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: t('Please confirm your password!')
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error(t('The two passwords that you entered do not match!'))
              )
            }
          })
        ]}
      >
        <Input.Password size="large" placeholder={t('Confirm Password')} />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error(t('Should accept agreement')))
          }
        ]}
      >
        <Checkbox>
          {t('I have read the')}{' '}
          <Link to={PATHS.SERVICE.TERMS_AND_CONDITIONS}>{t('agreement')}</Link>
        </Checkbox>
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        block
        loading={loading}
      >
        {t('Sign up')}
      </Button>
    </Form>
  )
}

SignupForm.propTypes = {
  form: PropTypes.object,
  onError: PropTypes.func.isRequired,
  onFinish: PropTypes.func,
  onFinishFailed: PropTypes.func,
  signup: PropTypes.func.isRequired
}

export default SignupForm
