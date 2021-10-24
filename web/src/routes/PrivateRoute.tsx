import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthState } from '../auth';

interface Props {
  exact?: boolean;
  path: string;
}

const PrivateRoute: React.FC<Props> = ({ children, exact, path }) => {
  const { isLogged } = useAuthState();

  return (
    <Route
      path={path}
      exact={exact || false}
    >
      {isLogged ? children : <Redirect to="/login" />}
    </Route>
  );
};

export default PrivateRoute;
