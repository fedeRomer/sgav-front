import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCookie} from './Common';


// handle the private routes
// discontinuado
function PrivateRoute({ component: Component, ...rest }) {

  return (
    <Route
      {...rest}
      render={(props) => getCookie(props) ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

export default PrivateRoute;