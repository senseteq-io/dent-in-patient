import { Box, Button, Img } from '@qonsoll/react-design'

import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { useTranslations } from 'contexts/Translation'

// const StyledVippsButton = styled(Button)`
//   background: ${(props) => props?.bg && props?.bg};

//   &:hover {
//     color: var(--ql-color-black);
//   }
// `

const VippsAuthButton = (props) => {
  const {
    onClick,
    icon,
    text,
    bg,
    size,
    block = true,
    disabled,
    ...rest
  } = props

  // [ADDITIONAL HOOKS]
  const { t } = useTranslations()

  return (
    <Button
      bg={bg}
      size={size}
      block={block}
      disabled={disabled}
      onClick={onClick}
      p="8px 16px"
      borderRadius={8}
      icon={
        <Box mr={2}>
          {icon || (
            <Img
              mr={2}
              src="icons/vipps-logo.svg"
              alt="Vipps icon"
              height="20px"
            />
          )}
        </Box>
      }
      {...rest}
    >
      {text || t('Sign in with Bank ID')}
    </Button>
  )
}
VippsAuthButton.propTypes = {
  icon: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  bg: PropTypes.string,
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'default', 'large'])
}

export default VippsAuthButton
