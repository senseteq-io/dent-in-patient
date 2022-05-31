import { Box, Button, Col, Img, Row, Text } from '@qonsoll/react-design'

import { CloseOutlined } from '@ant-design/icons'
import PATHS from 'pages/paths'
import cookie from 'assets/cookie.png'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useTranslations } from 'contexts/Translation'

const CloseWrapper = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--ql-color-dark-t-lighten2);
  transition: all var(--ql-animation-duration-fast)
    var(--ql-animation-cubic-ease-in-out);
  &:hover {
    color: var(--ql-color-dark);
    transition: all var(--ql-animation-duration-fast)
      var(--ql-animation-cubic-ease-in-out);
  }
`

const wrapperStyles = {
  position: 'absolute',
  bottom: '16px',
  left: '16px',
  width: '288px',
  p: '40px',
  bg: 'var(--ql-color-white)',
  borderRadius: 'var(--ql-border-radius-20)',
  boxShadow: '0 40px 120px 16px var(--ql-color-dark-t-lighten4)'
}

const GDPR_FLAG = 'gdpr'

const GDPRPopup = () => {
  const { t } = useTranslations()
  const history = useHistory()
  const isAcceptedGDPR = JSON.parse(window?.localStorage.getItem(GDPR_FLAG))
  const [show, setShow] = useState(!isAcceptedGDPR)
  const redirectToTheCookiesPolicies = () => {
    history.push(PATHS.SERVICE.GDPR)
  }
  const onAccept = () => {
    localStorage.setItem(GDPR_FLAG, 'true')
    setShow(false)
  }
  return (
    <>
      {show && (
        <Box {...wrapperStyles}>
          <CloseWrapper
            onClick={() => {
              setShow(false)
            }}
          >
            <CloseOutlined />
          </CloseWrapper>
          <Row noGutters v="center">
            <Col mb={3}>
              <Row noGutters h="center">
                <Col cw="auto" mb={24}>
                  <Img src={cookie} width="64" height="64" alt="cookie" />
                </Col>
                <Col cw={12} mb={24}>
                  <Text textAlign="center" whiteSpace="pre-wrap">
                    {t(
                      'gdprMessage',
                      `Application uses cookies to personalize content. By
                    continuing of using this site, you agree with our cookie
                    policy.`
                    )}
                  </Text>
                </Col>
                <Col cw={12}>
                  <Button block onClick={redirectToTheCookiesPolicies}>
                    {t('Cookie policy')}
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col cw={12}>
              <Button type="primary" block onClick={onAccept}>
                {t('Accept')}
              </Button>
            </Col>
          </Row>
        </Box>
      )}
    </>
  )
}

export default GDPRPopup
