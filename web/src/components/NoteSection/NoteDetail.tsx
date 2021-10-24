import { format, formatDistance } from 'date-fns';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useAuthState } from '../../auth';
import { IUser } from '../../types/models';

interface Props {
  title: string;
  description: string;
  author: IUser;
  createdAt: string;
  updatedAt: string;
  deleteNote: () => void;
}

const NoteDetail: React.FC<Props> = ({
  title,
  description,
  author,
  createdAt,
  updatedAt,
  deleteNote,
}: Props) => {
  const { url } = useRouteMatch();
  const { isLogged, user } = useAuthState();

  return (
    <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
      <Link
        to={`/users/${author.id}`}
        className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400"
      >
        <img
          className="rounded-full"
          width="256"
          height="256"
          src={`${author.avatar}?s=160`}
          alt={`${author.firstName} ${author.lastName}'s avatar`}
        />
      </Link>
      <div className="flex flex-col items-center text-center justify-center">
        <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
          <Link to={`/users/${author.id}`}>
            {author?.firstName} {author?.lastName}
          </Link>
        </h2>
        <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>

        <h3 className="text-base font-bold">{title}</h3>
        <p className="text-base">{description}</p>
        <div className="w-24 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>

        <p className="text-base">
          <time dateTime={format(new Date(createdAt), "yyyy-MM-dd'T'HH:mm:ss")}>
            Created{' '}
            {formatDistance(new Date(createdAt), new Date(), {
              addSuffix: true,
            })}
          </time>
          <br />
          {createdAt !== updatedAt && (
            <time
              dateTime={format(new Date(updatedAt), "yyyy-MM-dd'T'HH:mm:ss")}
            >
              Last update:{' '}
              {formatDistance(new Date(updatedAt), new Date(), {
                addSuffix: true,
              })}
            </time>
          )}
        </p>

        {isLogged && user.id === author.id && (
          <>
            <Link
              to={`${url}/update`}
              title="update note"
              className="max-w-2xl mx-auto appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-center my-1"
            >
              Update Note
            </Link>
            <button
              title="delete note"
              className="max-w-2xl mx-auto appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-center my-1"
              onClick={deleteNote}
            >
              Delete Note
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteDetail;
