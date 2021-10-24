import { format, formatDistance } from 'date-fns';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { api } from '../../api';
import { useAuthState } from '../../auth';
import { INote } from '../../types/models';

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
    <section className="text-gray-600 body-font overflow-hidden max-w-7xl mx-auto">
      <div className="container px-5 py-24 mx-auto">
        <div className="-my-8">
          {status === 'loading' ? (
            <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
              loading
            </h2>
          ) : status === 'error' ? (
            <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
              {error.message || error}
            </h2>
          ) : (
            data.data &&
            data.data.map((note: INote) => (
              <Link
                to={`/notes/${note.id}`}
                className="py-4 flex flex-wrap md:flex-nowrap mb-1 bg-gradient-to-r from-blue-500 via-pink-400 to-purple-500 rounded-lg"
                key={note.id}
              >
                <div className="md:flex-grow">
                  <div>
                    <h2 className="text-3xl font-medium text-white title-font mx-5">
                      {note.title}
                    </h2>
                  </div>
                  {/* {note.description && ( */}
                  {/* <p className="leading-relaxed">{note.description}</p> */}
                  {/* )} */}
                  <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col ">
                    <p className="text-white text-base md:text-lg capitalize mx-5">
                      <time
                        dateTime={format(
                          new Date(note.createdAt!),
                          "yyyy-MM-dd'T'HH:mm:ss"
                        )}
                      >
                        {formatDistance(new Date(note.createdAt!), new Date(), {
                          addSuffix: true,
                        })}
                      </time>
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      <Link
        to="/notes/create"
        title="create note"
        className="max-w-2xl mx-auto appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-center select-none mb-2"
      >
        Create note
      </Link>
    </section>
  );
};

export default NoteListView;
