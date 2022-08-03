import { Box, Button, Col, Row } from '@qonsoll/react-design'
import { Form, Input, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'

import PATHS from 'pages/paths'
import { PasswordStrengthIndicator } from 'components'
import PropTypes from 'prop-types'
import { notification } from 'antd'
import { useHistory } from 'react-router-dom'
import { useSessionActions } from 'domains/Session/hooks'
import { useTranslations } from 'contexts/Translation'
import { useUser } from 'domains/User/context'
import zxcvbn from 'zxcvbn'

const SetNewPasswordForm = (props) => {
  const { initialValues } = props

  // [ADDITIONAL HOOKS]
  const history = useHistory()
  const { t } = useTranslations()
  const [form] = Form.useForm()
  const ref = useRef()
  // get user auth from firebase auth hook
  const { user } = useUser()
  const { completeNewPassword } = useSessionActions()

  // [COMPONENT STATE HOOKS]
  const [isFormProcessing, setIsFormProcessing] = useState(false)
  const [pswrdStrengthLevel, setPswrdStrengthLevel] = useState(-1)
  /** state formWasSubmittedOnce was deleted, because it broke the logic of password validation
   *  now validation occurs when there is a change of characters in the first or second field
   */

  // [HELPER FUNCTIONS]
  const onFinish = async ({ password }) => {
    try {
      // starting of the loading spinner
      setIsFormProcessing(true)

      // add user new password to give possibility login with email (request to backend)
      const { data } = await completeNewPassword({
        password,
        userEmail: user?.email,
        userId: user?._id,
        errorDescription: t('Failed to complete new password')
      })
      if (data === 'success') {
        const nextRoute = user?.nextBooking?._id
          ? PATHS.CONFIG.AFTER_LOGIN_WITH_BOOKING
          : PATHS.CONFIG.AFTER_LOGIN_WITHOUT_BOOKING
        history.push(nextRoute)
      }
    } catch (error) {
      const errorMessageComputed = error?.toString()
      // eslint-disable-next-line no-console
      console.error(errorMessageComputed)

      notification.error({
        message: t('Complete password error'),
        description: errorMessageComputed
      })
    } finally {
      // stopping of the loading spinner
      setIsFormProcessing(false)
    }
  }
  const onFinishFailed = (errorInfo) => {
    // eslint-disable-next-line no-console
    console.error('Failed:', errorInfo)

    notification.error({
      message: t('Complete password error'),
      description: errorInfo
    })
  }

  function handleKeyUp(event) {
    // Enter handler
    if (event.keyCode === 13) {
      ref.current.submit()
    }
  }

  const onPasswordChange = (event) => {
    // value has text from input
    const value = event.target.value

    // score has level guessable of password
    const score = value.length === 0 ? -1 : zxcvbn(value).score
    setPswrdStrengthLevel(score ?? 4)
  }

  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [form, initialValues])

  return (
    <Form
      layout="vertical"
      ref={ref}
      form={form}
      onFinish={onFinish}
      onKeyUp={handleKeyUp}
      initialValues={initialValues}
      onFinishFailed={onFinishFailed}
    >
      <Spin spinning={isFormProcessing} style={{ width: '100%' }}>
        <Box display="none">
          <Form.Item name="username">
            <Input onChange={onPasswordChange} />
          </Form.Item>
        </Box>
        <Form.Item
          name="password"
          extra={<PasswordStrengthIndicator level={pswrdStrengthLevel} />}
          rules={[
            { required: true, message: t('Password is required') },
            {
              min: 6,
              message: t('The password must be at least 6 characters long')
            }
          ]}
        >
          <Input.Password
            placeholder={t('Enter new password here')}
            onChange={onPasswordChange}
          />
        </Form.Item>

        <Form.Item
          dependencies={['password']}
          name="passwordConfirmation"
          style={{ marginBottom: 0 }}
          rules={[
            {
              required: true,
              message: t('Password confirming is required')
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                )
              }
            })
          ]}
        >
          <Input.Password placeholder={t('Confirm new password')} />
        </Form.Item>
      </Spin>
      <Row h="right" noGutters mt={40}>
        <Col cw="auto">
          <Button
            type="primary"
            disabled={isFormProcessing || !user?._id}
            onClick={form.submit}
          >
            {t('Set password')}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

SetNewPasswordForm.propTypes = {
  initialValues: PropTypes.object
}

export default SetNewPasswordForm
