import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundImg from '../assets/undraw_page_not_found_su7k.svg';

const NotFoundView: React.FC = () => {
  return (
    <div className="pt-0 m-2">
      <div className="container max-w-7xl mx-auto pt-16 bg-gray-100 dark:bg-gray-300 rounded-r-2xl rounded-l-2xl">
        <img
          src={NotFoundImg}
          alt="not found image"
          className="block mx-auto"
        />

        <div className="text-center pb-3 md:pb-10 xl:pb-20">
          <h1 className="px-2 xl:px-0 xl:text-5xl md:text-3xl text-2xl font-extrabold text-gray-800">
            Oops! Page not found.
          </h1>
          <p className="text-gray-800 mt-4 text-xl">
            We can't find page you're looking for.
          </p>

          <Link
            to="/"
            title="go back home"
            className="mx-auto my-2 w-48 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base text-white bg-indigo-600 hover:bg-indigo-700 uppercase font-semibold"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundView;
