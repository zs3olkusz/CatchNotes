import React, { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../../routes/PrivateRoute';

const NoteView = lazy(() => import('./Detail'));
const NoteCreateView = lazy(() => import('./Create'));
const NoteListView = lazy(() => import('./List'));

const NoteViews: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <PrivateRoute exact path={path}>
        <NoteListView />
      </PrivateRoute>
      <PrivateRoute exact path={`${path}/create`}>
        <NoteCreateView />
      </PrivateRoute>
      <Route path={`${path}/:id`}>
        <NoteView />
      </Route>
    </Switch>
  );
};

export default NoteViews;
