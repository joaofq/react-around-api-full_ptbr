import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ children, ...props }) {
  return (
    <Route exact path={props.path}>
      {() => (props.isLoggedIn ? children : <Redirect to="/signin" />)}
    </Route>
  );
}

export default ProtectedRoute;
