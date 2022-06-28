import PropTypes from 'prop-types'
import { Progress } from 'antd'
import { Text, Row, Col } from '@qonsoll/react-design'
import { useTranslations } from 'contexts/Translation'

const LEVELS_CONFIG = {
  0: { percent: 15, text: 'Very weak', color: '#ff4033' },
  1: { percent: 40, text: 'Weak', color: '#fe940d' },
  2: { percent: 60, text: 'Fear', color: '#f3ce00' },
  3: { percent: 80, text: 'Good', color: '#42af38' },
  4: { percent: 100, text: 'Strong', color: '#35830a' }
}

const PasswordStrengthIndicator = (props) => {
  const { level } = props

  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()

  return (
    <>
      <Row noGutters>
        <Col cw={12}>
          <Progress
            showInfo={false}
            strokeColor={LEVELS_CONFIG?.[level]?.color}
            percent={LEVELS_CONFIG?.[level]?.percent}
          />
        </Col>
      </Row>
      <Row noGutters>
        <Col cw="auto" mr={1}>
          <Text
            color={
              LEVELS_CONFIG?.[level]?.color ||
              'var(--ql-typography-text-color-secondary)'
            }
          >
            {t('Password strength')}:
          </Text>
        </Col>
        <Col cw="auto">
          <Text color={LEVELS_CONFIG?.[level]?.color} textTransform="lowercase">
            {LEVELS_CONFIG?.[level]?.text && t(LEVELS_CONFIG[level].text)}
          </Text>
        </Col>
      </Row>
    </>
  )
}

export default PasswordStrengthIndicator

PasswordStrengthIndicator.propTypes = {
  level: PropTypes.number
}
