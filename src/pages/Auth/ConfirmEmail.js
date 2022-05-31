import { Box, Button, PageWrapper, Text } from '@qonsoll/react-design'

import IllustrationConfirmEmail from 'assets/ConfirmEmail.svg'
import PATHS from 'pages/paths'
import firebase from 'firebase/compat/app'
import { message } from 'antd'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import { useHandleError } from 'hooks'
import { useHistory } from 'react-router-dom'
import { useSessionActions } from 'domains/Session/hooks'
import { useTranslations } from 'contexts/Translation'

const ConfirmEmail = () => {
  const { t } = useTranslations()
  const history = useHistory()
  const onError = useHandleError()
  const { sendEmailVerification } = useSessionActions()
  const [user] = useAuthState(firebase.auth())

  useEffect(() => {
    const interval =
      user &&
      setInterval(() => {
        user.reload()
        if (user?.emailVerified) {
          message.success(t('Email has been verified'))
          history.push(PATHS.CONFIG.AFTER_SIGNUP)
        }
      }, 1000)

    return () => clearInterval(interval)
  }, [history, user, t])

  return (
    <PageWrapper
      alignMiddle
      height="100%"
      headingProps={{
        title: t('Confirm your email'),
        titleVariant: ['h3', 'h1'],
        titleMarginBottom: [2, 3],
        subTitle: t(
          'confirmEmailSubtitle',
          `We've sent you email. Please, check your mailbox and follow instructions inside.`
        ),
        textAlign: 'center',
        marginBottom: [3, 24]
      }}
      contentWidth={['100%', '100%', 480]}
    >
      <Box display="flex" justifyContent="center">
        <Text code mb={[3, 40]}>
          {user.email}
        </Text>
      </Box>
      <IllustrationConfirmEmail width={['100%', 400, 480]} mb={[4, 4]} />
      <Box display="flex" justifyContent="center">
        <Text textAlign="center" mb={[12, 3]}>
          {t('dontReceiveEmail', `Don't receive the email?`)}
        </Text>
      </Box>
      <Button
        block={[true, false]}
        onClick={() => {
          sendEmailVerification(onError)
        }}
      >
        {t('Resend email')}
      </Button>
    </PageWrapper>
  )
}

export default ConfirmEmail
