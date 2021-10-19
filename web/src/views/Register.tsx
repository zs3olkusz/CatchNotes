import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { api } from '../api';
import { useAuthState } from '../auth';
import logo from '../assets/logo-small.png'

interface IRegisterDetails {
  email: string;
  firstName: string;
  lastName: string;
  password1: string;
  password2: string;
}

const RegisterView: React.FC = () => {
  const history = useHistory();
  const [registerDetails, setRegisterDetails] = useState<IRegisterDetails>({
    email: '',
    firstName: '',
    lastName: '',
    password1: '',
    password2: '',
  });
  const [isLoding, setIsLoding] = useState(false);
  const [err, setErr] = useState('');
  const { isLogged } = useAuthState();

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
    setRegisterDetails({
      ...registerDetails,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setErr('');

    // prevent submiting form when passwords does not match
    // or password length is lower than 8 characters
    if (registerDetails.password1 !== registerDetails.password2) {
      setErr('Passwords does not match!');
      return;
    } else if (registerDetails.password1.length < 8) {
      setErr('Password is too short!');
      return;
    }

    const data = {
      email: registerDetails.email,
      firstName: registerDetails.firstName,
      lastName: registerDetails.lastName,
      password: registerDetails.password1,
    };

    await api
      .post('/users', data)
      .then(() => {
        setIsLoding(true);
      })
      .catch((err) => {
        setErr(err.message || err);
      })
      .finally(() => {
        setIsLoding(false);

        if (!err) {
          try {
            history.goBack();
          } catch {
            history.push('/');
          }
        }
      });
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
            Create your account
          </h2>
        </div>

        <div>
          {err && (
            <div className="text-sm text-red-600 font-semibold">{err}</div>
          )}
        </div>

        <form className="mt-8 space-y-6" method="POST" onSubmit={handleLogin}>
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
                value={registerDetails.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="first-name" className="sr-only">
                First name
              </label>
              <input
                id="first-name"
                name="firstName"
                type="text"
                autoComplete="first-name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="First name"
                value={registerDetails.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="Last-name" className="sr-only">
                Last name
              </label>
              <input
                id="last-name"
                name="lastName"
                type="text"
                autoComplete="last-name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last name"
                value={registerDetails.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password1" className="sr-only">
                Password
              </label>
              <input
                id="password1"
                name="password1"
                type="password"
                autoComplete="current-password"
                required
                min="8"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={registerDetails.password1}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password2" className="sr-only">
                Password
              </label>
              <input
                id="password2"
                name="password2"
                type="password"
                autoComplete="repeat-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm password"
                value={registerDetails.password2}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div />
            <div className="text-sm">
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                You already have an account?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md from-blue-500 via-pink-400 to-purple-500 bg-gradient-to-br focus:from-pink-500 focus:to-red-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoding}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterView;
