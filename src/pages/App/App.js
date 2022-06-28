import { BookingShow, BookingsAll } from './Booking'
import { Redirect, Route, Switch } from 'react-router-dom'
import { UserEdit, UserShow } from './User'

import { BoilerplateLayout } from 'components'
import Dashboard from './Dashboard/Dashboard'
import PATHS from '../paths'
import { SetNewPassword } from '../Auth'

const { DASHBOARD, USER_EDIT, USER_SHOW, BOOKINGS, SET_NEW_PASSWORD } =
  PATHS.AUTHENTICATED

const routes = [
  { key: 'BOOKINGS', path: BOOKINGS, component: BookingsAll, exact: true },
  {
    key: 'NEXT_BOOKING',
    path: PATHS.AUTHENTICATED.NEXT_BOOKING,
    component: BookingShow
  },
  { key: 'DASHBOARD', path: DASHBOARD, component: Dashboard, exact: true },
  { key: 'USER_SHOW', path: USER_SHOW, component: UserShow, exact: true },
  { key: 'USER_EDIT', path: USER_EDIT, component: UserEdit, exact: true },
  {
    key: 'SET_NEW_PASSWORD',
    path: SET_NEW_PASSWORD,
    component: SetNewPassword,
    exact: false
  }
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
