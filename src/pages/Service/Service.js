import { Redirect, Route, Switch } from 'react-router-dom'

// import { ServiceLayout } from '../../components'
import AccessDenied from './AccessDenied'
import GDPRPage from './GDPRPage'
import NotFound from './NotFound'
import PATHS from '../paths'
import TermsAndConditionsOfUse from './TermsAndConditionsOfUse'

const { ACCESS_DENIED, NOT_FOUND, GDPR, TERMS_AND_CONDITIONS_OF_USE } =
  PATHS.SERVICE

const routes = [
  {
    key: 'ACCESS_DENIED',
    path: ACCESS_DENIED,
    component: AccessDenied,
    exact: true
  },
  { key: 'NOT_FOUND', path: NOT_FOUND, component: NotFound, exact: true },
  { key: 'GDPR', path: GDPR, component: GDPRPage, exact: true },
  {
    key: 'TERMS_AND_CONDITIONS_OF_USE',
    path: TERMS_AND_CONDITIONS_OF_USE,
    component: TermsAndConditionsOfUse,
    exact: true
  }
]

const Service = () => {
  return (
    <Switch>
      {routes.map((routeProps) => (
        <Route key={routeProps.key} {...routeProps} />
      ))}
      <Redirect to={PATHS.SERVICE.NOT_FOUND} />
    </Switch>
  )
}

export default Service
