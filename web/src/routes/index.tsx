import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const HomeView = lazy(() => import('../views/Home'));
const LoginView = lazy(() => import('../views/Login'));
const NotFoundView = lazy(() => import('../views/NotFound'));

const IndexRouter: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomeView} />
      <Route exact path="/login" component={LoginView} />
      <Route path="*" component={NotFoundView} />
    </Switch>
  );
};

export default IndexRouter;
