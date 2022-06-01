import { Redirect, Route, Switch } from 'react-router-dom'

import { BoilerplateLayout } from 'components'
import ConfirmEmail from './ConfirmEmail'
import ForgotPassword from './ForgotPassword'
import Login from './Login'
import LoginWithEmail from './LoginWithEmail'
import PATHS from '../paths'
import SignUpWithEmail from './SignUpWithEmail'
import Signup from './Signup'
import VippsCallback from './VippsCallback'

const {
  LOGIN,
  VIPPS_LOGIN_CALLBACK,
  LOGIN_WITH_EMAIL,
  SIGNUP,
  SIGNUP_WITH_EMAIL,
  FORGOT_PASSWORD,
  CONFIRM_EMAIL
} = PATHS.UNAUTHENTICATED

const routes = [
  { key: 'LOGIN', path: LOGIN, component: Login, exact: true },
  {
    key: 'VIPPS_LOGIN_CALLBACK',
    path: VIPPS_LOGIN_CALLBACK,
    component: VippsCallback,
    exact: true
  },
  { key: 'SIGNUP', path: SIGNUP, component: Signup, exact: true },
  {
    key: 'FORGOT_PASSWORD',
    path: FORGOT_PASSWORD,
    component: ForgotPassword,
    exact: true
  },
  {
    key: 'LOGIN_WITH_EMAIL',
    path: LOGIN_WITH_EMAIL,
    component: LoginWithEmail,
    exact: true
  },
  {
    key: 'SIGNUP_WITH_EMAIL',
    path: SIGNUP_WITH_EMAIL,
    component: SignUpWithEmail,
    exact: true
  },
  {
    key: 'CONFIRM_EMAIL',
    path: CONFIRM_EMAIL,
    component: ConfirmEmail,
    exact: true
  }
]

const Auth = () => {
  return (
    <BoilerplateLayout>
      <Switch>
        {routes.map((routeProps) => (
          <Route key={routeProps.key} {...routeProps} />
        ))}
        <Redirect to={PATHS.SERVICE.NOT_FOUND} />
      </Switch>
    </BoilerplateLayout>
  )
}

export default Auth
