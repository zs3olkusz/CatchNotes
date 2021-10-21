import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Menu } from 'react-feather';
import { Link } from 'react-router-dom';
import { logout, useAuthDispatch, useAuthState } from '../auth';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const dispatch = useAuthDispatch();
  const { isLogged } = useAuthState();

  const handleLogout = async () => {
    await logout(dispatch);
  };

  return (
    <>
      <Popover className="relative bg-white" as="nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to="/" title="home">
                <span className="sr-only">CatchNOTE</span>
                <img
                  className="h-12 w-auto sm:h-14"
                  src={logo}
                  alt="CatchNOTE logo"
                  height="48"
                  width="100"
                />
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <nav className="hidden md:flex space-x-10">
              <Link
                to="/notes"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
                title="notes"
              >
                <span>Notes</span>
              </Link>
              <Link
                to="/"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
                title="collab"
              >
                <span>Collab</span>
              </Link>
              <Link
                to="/"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
                title="home"
              >
                <span>Home</span>
              </Link>
              <Link
                to="/faq"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
                title="FAQ"
              >
                FAQ
              </Link>
              <Link
                to="/about"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
                title="about"
              >
                About
              </Link>
            </nav>
            {isLogged ? (
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <Link
                  to="/login"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  onClick={handleLogout}
                  title="logout"
                >
                  Logout
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <Link
                  to="/login"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  title="login"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-base font-medium text-white from-purple-500 to-pink-600 bg-gradient-to-br hover:from-purple-400 hover:to-pink-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  title="sign up"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <Link to="/" title="home">
                    <img
                      className="h-8 w-auto"
                      src={logo}
                      alt="Logo"
                      height="32"
                      width="60"
                    />
                  </Link>
                  <div className="-mr-2">
                    <Popover.Button
                      className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      aria-label="Close menu"
                    >
                      <span className="sr-only">Close menu</span>
                      <Menu />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="py-6 px-5 space-y-6">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <Link
                    to="/notes"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    title="notes"
                  >
                    <span>Notes</span>
                  </Link>

                  <Link
                    to="/"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    title="FAQ"
                  >
                    FAQ
                  </Link>

                  <Link
                    to="/faq"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    title="collab"
                  >
                    <span>Collab</span>
                  </Link>

                  <Link
                    to="/about"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    title="about"
                  >
                    <span>About</span>
                  </Link>
                </div>
                {!isLogged ? (
                  <div>
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      title="sign up"
                    >
                      Register
                    </Link>
                    <p className="mt-6 text-center text-base font-medium text-gray-500">
                      Already have an account?{' '}
                      <Link
                        to="/login"
                        className="text-indigo-600 hover:text-indigo-500"
                        title="login"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                ) : (
                  <div>
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      onClick={handleLogout}
                      title="logout"
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default Navbar;
