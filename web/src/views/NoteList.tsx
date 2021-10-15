import { format, formatDistance } from 'date-fns';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useAuthState } from '../auth';
import { INote } from '../types/models';

function useUserNotes(userId: string): any {
  return useQuery(['user_notes', userId], async () => {
    const { data } = await api.get('notes/', {
      params: {
        userId: userId,
      },
    });
    return data;
  });
}

const NoteListView: React.FC = () => {
  const { user } = useAuthState();
  const { status, data, error } = useUserNotes(user.id);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-100">
          {status === 'loading' ? (
            <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
              loading
            </h2>
          ) : status === 'error' ? (
            <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
              {error}
            </h2>
          ) : (
            data.data.map((note: INote) => (
              <article
                className="py-8 flex flex-wrap md:flex-nowrap"
                key={note.id}
              >
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <time
                    className="mt-1 text-gray-500 text-sm capitalize"
                    dateTime={format(
                      new Date(note.createdAt),
                      "yyyy-MM-dd'T'HH:mm:ss"
                    )}
                  >
                    {formatDistance(new Date(note.createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </time>
                </div>
                <div className="md:flex-grow">
                  <Link to={`/notes/${note.id}`}>
                    <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                      {note.title}
                    </h2>
                  </Link>
                  {note.description && (
                    <p className="leading-relaxed">{note.description}</p>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default NoteListView;
