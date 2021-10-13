import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const HomeView = lazy(() => import('../views/Home'));
const LoginView = lazy(() => import('../views/Login'));
const NoteView = lazy(() => import('../views/Note'));
const NoteListView = lazy(() => import('../views/NoteList'));
const NotFoundView = lazy(() => import('../views/NotFound'));

const IndexRouter: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomeView} />
      <Route exact path="/login" component={LoginView} />
      <Route exact path="/notes" component={NoteListView} />
      <Route path="/notes/:id" component={NoteView} />
      <Route path="*" component={NotFoundView} />
    </Switch>
  );
};

export default IndexRouter;
