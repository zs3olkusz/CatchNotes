import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const HomeView = lazy(() => import('../views/Home'));
const LoginView = lazy(() => import('../views/Login'));
const RegisterView = lazy(() => import('../views/Register'));
const NotFoundView = lazy(() => import('../views/NotFound'));
const AboutView = lazy(() => import('../views/About'));
const FaqView = lazy(() => import('../views/Faq'));

import NoteViews from '../views/Note';

const IndexRouter: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomeView} />
      <Route exact path="/about" component={AboutView} />
      <Route exact path="/faq" component={FaqView} />
      <Route exact path="/login" component={LoginView} />
      <Route exact path="/register" component={RegisterView} />
      <Route path="/notes" component={NoteViews} />
      <Route path="*" component={NotFoundView} />
    </Switch>
  );
};

export default IndexRouter;
