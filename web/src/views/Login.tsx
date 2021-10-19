import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { loginUser, useAuthDispatch, useAuthState } from '../auth';
import logo from '../assets/logo-small.png'

const LoginView: React.FC = () => {
  const history = useHistory();
  const [loginDetails, setLoginDetails] = useState({
    strategy: 'local',
    email: '',
    password: '',
  });
  const [err, setErr] = useState('');

  const dispatch = useAuthDispatch();
  const { isLogged, loading, errorMessage } = useAuthState();

  useEffect(() => {
    if (isLogged) {
      try {
        history.goBack();
      } catch {
        history.push('/');
      }
    }
  }, []);

  useEffect(() => {
    if (isLogged) {
      try {
        history.goBack();
      } catch {
        history.push('/');
      }
    }
  }, [isLogged]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setErr('');

      const res = await loginUser(dispatch, loginDetails);

      if (errorMessage) {
        setErr(errorMessage);
      }

      if (!res) {
        try {
          history.goBack();
        } catch {
          history.push('/');
        }
      }
    } catch (err) {
      setErr((err as any).message || err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-36 w-auto"
            src={logo}
            alt="Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div>
          {err && (
            <div className="text-sm text-red-600 font-semibold">{err}</div>
          )}
        </div>

        <form className="mt-8 space-y-6" method="POST" onSubmit={handleLogin}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={loginDetails.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={loginDetails.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Don't have an account?
              </Link>
            </div>

            <div className="text-sm">
              <Link
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div className="dark">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md from-purple-600 via-pink-400 to-blue-500 bg-gradient-to-br focus:from-pink-500 focus:to-red-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              Sign in
            </button>
            <div className="bg-white dark:bg-black"></div>
            <div className="bg-white dark:bg-black"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
