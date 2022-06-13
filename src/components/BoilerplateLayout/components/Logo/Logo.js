import { Img } from '@qonsoll/react-design'
import logo from 'assets/logo-dentin-light.svg'
import PropTypes from 'prop-types'
const Logo = (props) => {
  const { height = '32' } = props

  return <Img src={logo} alt="Dent in | Client" height={height} />
}

Logo.propTypes = {
  height: PropTypes.string
}
export default Logo
