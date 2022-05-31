import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'

import { App } from './App'
import { Auth } from './Auth'
import RoutesRedirect from './RoutesRedirect'
import { Service } from './Service'

const Navigator = () => {
  return (
    <Router>
      <RoutesRedirect>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/auth" />
          </Route>
          <Route path="/auth/:path?" component={Auth} />
          <Route path="/service/:path?" component={Service} />
          <Route component={App} />
        </Switch>
      </RoutesRedirect>
    </Router>
  )
}

export default Navigator
