import { Avatar, Box, Button, Text } from '@qonsoll/react-design'
import { SwapOutlined, UserOutlined } from '@ant-design/icons'

import PropTypes from 'prop-types'
import { Tooltip } from 'antd'
import styled from 'styled-components'
import { useTranslations } from 'contexts/Translation'

const LastSessionUserWrapper = styled.div`
  display: flex;
  align-items: center;
  height: var(--ql-component-height-lg);
  background-color: ${(sessionProvider) =>
    sessionProvider === 'google'
      ? 'var(--ql-color-white)'
      : 'var(--ql-color-dark-t-lighten6)'};
  border-radius: var(--ql-border-radius-md);
  padding: 0 8px 0 16px;
  cursor: pointer;
  transition: all var(--ql-animation-duration-default)
    var(--ql-animation-cubic-ease-in-out);
  &:hover {
    background-color: var(--ql-color-accent1-t-lighten6);
    box-shadow: inset 0 0 0 var(--ql-border-width-default)
      var(--ql-color-accent1);
    transition: all var(--ql-animation-duration-default)
      var(--ql-animation-cubic-ease-in-out);
  }
`

const LastSessionUser = ({
  lastSession,
  onChangeAccount,
  redirectTo,
  vertical,
  sessionProvider
}) => {
  const { t } = useTranslations()
  return (
    <>
      {!vertical ? (
        <Box position="relative">
          <LastSessionUserWrapper onClick={redirectTo}>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              src={lastSession.avatarUrl}
              mr={3}
            />
            <Box
              display="flex"
              flexDirection="column"
              flexGrow={1}
              minWidth={0}
            >
              <Text variant="h5" isEllipsis>
                {lastSession.displayName || t('No name')}
              </Text>
              {lastSession.email && (
                <Text variant="body2" type="secondary" isEllipsis>
                  {lastSession.email}
                </Text>
              )}
            </Box>
          </LastSessionUserWrapper>
          <Box
            position="absolute"
            top="50%"
            right={2}
            transform="translate(0, -50%)"
          >
            <Tooltip title={t('Change account')}>
              <Button
                type="text"
                icon={<SwapOutlined />}
                onClick={onChangeAccount}
              />
            </Tooltip>
          </Box>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" mb={40}>
          <Avatar
            size={128}
            icon={<UserOutlined />}
            src={lastSession.avatarUrl}
            mb={3}
          />
          <Box display="flex" flexDirection="column" alignItems="center">
            <Text variant="h1" isEllipsis>
              {lastSession.displayName || t('No name')}
            </Text>
            {lastSession.email && (
              <Text variant="body1" type="secondary" isEllipsis>
                {lastSession.email}
              </Text>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}

LastSessionUser.propTypes = {
  lastSession: PropTypes.shape({
    avatarUrl: PropTypes.any,
    displayName: PropTypes.func,
    email: PropTypes.any
  }),
  onChangeAccount: PropTypes.any,
  redirectTo: PropTypes.any,
  sessionProvider: PropTypes.any,
  vertical: PropTypes.any
}

export default LastSessionUser
