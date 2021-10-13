import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const HomeView = lazy(() => import('../views/Home'));
const LoginView = lazy(() => import('../views/Login'));
const RegisterView = lazy(() => import('../views/Register'));
const NoteView = lazy(() => import('../views/Note'));
const NoteListView = lazy(() => import('../views/NoteList'));
const NotFoundView = lazy(() => import('../views/NotFound'));
const AboutView = lazy(() => import('../views/About'));

const IndexRouter: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomeView} />
      <Route exact path="/about" component={AboutView} />
      <Route exact path="/login" component={LoginView} />
      <Route exact path="/register" component={RegisterView} />
      <Route exact path="/notes" component={NoteListView} />
      <Route path="/notes/:id" component={NoteView} />
      <Route path="*" component={NotFoundView} />
    </Switch>
  );
};

export default IndexRouter;
