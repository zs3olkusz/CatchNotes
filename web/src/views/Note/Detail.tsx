import React, { lazy } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { useNote } from '../../hooks/useNote';
import Section from '../../components/NoteSection/Section';
import PrivateRoute from '../../routes/PrivateRoute';

const NoteUpdateView = lazy(() => import('./Update'));

const NoteView: React.FC = () => {
  const { path } = useRouteMatch();
  const { id } = useParams<{ id: string }>();
  const { status, data, error } = useNote(id);

  return (
    <Switch>
      <Route exact path={path}>
        <div>
          {status === 'loading' ? (
            <p>loading...</p>
          ) : status === 'error' ? (
            <p>{error?.message || error}</p>
          ) : (
            data && (
              <>
                {data.sections?.map((section, idx) => (
                  <Section
                    key={idx}
                    idx={idx}
                    id={section.id!}
                    noteId={id}
                    noteTitle={data.title}
                    noteDescription={data.description}
                    noteAuthor={data.user!}
                    noteCreatedAt={data.createdAt!}
                    noteUpdatedAt={data.updatedAt!}
                    section={section}
                  />
                ))}
              </>
            )
          )}
        </div>
      </Route>
      <PrivateRoute path={`${path}/update`}>
        <NoteUpdateView id={id} status={status} data={data} error={error} />
      </PrivateRoute>
    </Switch>
  );
};

export default NoteView;
