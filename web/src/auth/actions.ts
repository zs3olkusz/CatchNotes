import React from 'react';
import { Cookies } from 'react-cookie';

import { api, createAccessTokenCookie } from '../api';
import { IUser } from '../types/models';
import type { IAuthAction } from './reducer';

const cookies = new Cookies();

interface ILoginPayload {
  email: string;
  password: string;
}

interface ILoginResult {
  accessToken: string;
  user: IUser;
}

export async function loginUser(
  dispatch: React.Dispatch<IAuthAction>,
  loginPayload: ILoginPayload
): Promise<ILoginResult | undefined> {
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let data: ILoginResult = {
      accessToken: '',
      user: {
        _id: '',
        email: '',
        firstName: '',
        lastName: '',
        avatar: '',
      },
    };
    let error = '';

    await api
      .post('/authentication/', loginPayload)
      .then((res) => {
        data = res.data as ILoginResult;
      })
      .catch((err) => {
        error = err.message || err;
      });

    if (data.accessToken && !error) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });

      // @ts-ignore
      api.defaults.headers.Authorization = `Bearer ${data.accessToken}`;

      createAccessTokenCookie(data.accessToken);

      return data;
    }

    dispatch({ type: 'LOGIN_ERROR', error: error });
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error as string });
  }
}

export async function logout(
  dispatch: React.Dispatch<IAuthAction>
): Promise<void> {
  dispatch({ type: 'LOGOUT' });

  // @ts-ignore
  api.defaults.headers.Authorization = '';

  cookies.remove('access_token', { path: '/' });
}
