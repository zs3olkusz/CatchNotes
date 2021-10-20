import { format, formatDistance } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import type { IUser } from '../../../types/models';

interface Props {
  title: string;
  description: string;
  author: IUser;
  createdAt?: string;
  updatedAt?: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NoteDetailEdit: React.FC<Props> = ({
  title,
  description,
  author,
  createdAt,
  updatedAt,
  handleInputChange,
}: Props) => {
  return (
    <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
      <Link
        to={`/users/${author.id}`}
        className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400"
      >
        <img
          className="rounded-full"
          src={author.avatar}
          alt={`${author.firstName} ${author.lastName}'s avatar`}
        />
      </Link>
      <div className="flex flex-col items-center text-center justify-center">
        <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
          <Link
            to={`/users/${author.id}`}
            title={`${author?.firstName} ${author?.lastName}'s profile`}
          >
            {author?.firstName} {author?.lastName}
          </Link>
        </h2>
        <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>

        <div className="my-4">
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm font-bold"
            placeholder="Title"
            value={title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="description" className="sr-only">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Description"
            value={description}
            onChange={handleInputChange}
          />
        </div>

        {createdAt && (
          <>
            <div className="w-24 h-1 bg-indigo-500 rounded mt-2 mb-4" />

            <p className="text-base">
              <time
                dateTime={format(new Date(createdAt), "yyyy-MM-dd'T'HH:mm:ss")}
              >
                Created{' '}
                {formatDistance(new Date(createdAt), new Date(), {
                  addSuffix: true,
                })}
              </time>
              <br />
              {updatedAt && createdAt !== updatedAt && (
                <time
                  dateTime={format(
                    new Date(updatedAt),
                    "yyyy-MM-dd'T'HH:mm:ss"
                  )}
                >
                  Last update:{' '}
                  {formatDistance(new Date(updatedAt), new Date(), {
                    addSuffix: true,
                  })}
                </time>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteDetailEdit;
