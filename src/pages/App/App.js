import { Redirect, Route, Switch } from 'react-router-dom'
import { UserEdit, UserShow } from './User'

import { BoilerplateLayout } from 'components'
import Dashboard from './Dashboard/Dashboard'
import PATHS from '../paths'

const { DASHBOARD, USER_EDIT, USER_SHOW } = PATHS.AUTHENTICATED

const routes = [
  { key: 'DASHBOARD', path: DASHBOARD, component: Dashboard, exact: true },
  { key: 'USER_SHOW', path: USER_SHOW, component: UserShow, exact: true },
  { key: 'USER_EDIT', path: USER_EDIT, component: UserEdit, exact: true }
]

const App = () => {
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

export default App
