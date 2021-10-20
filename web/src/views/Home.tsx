import React from 'react';
import { Link } from 'react-router-dom';

const HomeView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <div>
              <div className="relative pt-6 px-4 sm:px-6 lg:px-8 sm:h-10" />
            </div>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center md:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Write </span>
                  <span className="block text-purple-700 xl:inline">
                    your notes
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  On this website you can create notes that will help you in
                  your future education. Learn more with your friends using our
                  site. Have fun ! :)
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/notes"
                      className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white from-purple-500 to-pink-600 bg-gradient-to-br hover:from-purple-400 hover:to-pink-500 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                      title="notes"
                    >
                      Notes
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/"
                      className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white from-purple-500 to-pink-600 bg-gradient-to-br hover:from-purple-400 hover:to-pink-500 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                      title="collab"
                    >
                      Collab
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="object-cover md:h-auto lg:h-full"
            src="https://zyskiwanieprzewagi.com/wp-content/uploads/2019/10/jak-robic%CC%81-notatki-do-szko%C5%82y-lub-na-uczelnie%CC%A8-1024x683.jpg"
            alt="taking note image"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeView;
