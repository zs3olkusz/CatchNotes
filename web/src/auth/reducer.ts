import { Cookies } from 'react-cookie';

import type { IUser } from '../types/models';

const cookies = new Cookies();

export interface IAuthState {
  user: IUser;
  accessToken: string;
  loading: boolean;
  errorMessage: null | string;
  isLogged: boolean;
}

const accessTokenCookie = cookies.get('access_token');

let userData = {
  _id: '',
  email: '',
};

if (accessTokenCookie) {
  userData = JSON.parse(atob(accessTokenCookie.split('.')[1]));
}

const user: IUser = {
  _id: userData._id,
  email: userData.email,
};

export const initialState: IAuthState = {
  user: user,
  accessToken: accessTokenCookie || '',
  loading: false,
  errorMessage: null,
  isLogged: !!accessTokenCookie === true,
};

export interface IAuthPayload {
  user: IUser;
  accessToken: string;
}

export type IAuthAction =
  | { type: 'REQUEST_LOGIN' | 'LOGOUT' }
  | { type: 'LOGIN_SUCCESS'; payload: IAuthPayload }
  | { type: 'LOGIN_ERROR'; error: string };

export const AuthReducer = (
  initialState: IAuthState,
  action: IAuthAction
): IAuthState => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        loading: false,
        isLogged: true,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        user: {
          _id: '',
          email: '',
        },
        accessToken: '',
        isLogged: false,
      };

    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      return initialState;
  }
};
