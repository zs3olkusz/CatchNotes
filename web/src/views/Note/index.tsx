import React, { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const NoteView = lazy(() => import('./Detail'));
const NoteCreateView = lazy(() => import('./Create'));
const NoteListView = lazy(() => import('./List'));

const NoteViews: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <NoteListView />
      </Route>
      <Route exact path={`${path}/create`}>
        <NoteCreateView />
      </Route>
      <Route path={`${path}/:id`}>
        <NoteView />
      </Route>
    </Switch>
  );
};

export default NoteViews;
