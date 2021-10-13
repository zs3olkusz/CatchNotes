import React, { createContext, useContext, useReducer } from 'react';
import { Cookies } from 'react-cookie';

import type { IAuthAction, IAuthState } from './reducer';
import { AuthReducer, initialState } from './reducer';

const cookies = new Cookies();

const accessTokenCookie = cookies.get('access_token');

const AuthStateContext = createContext<IAuthState>({
  user: accessTokenCookie?.user || {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    avatar: '',
  },
  accessToken: accessTokenCookie || '',
  loading: false,
  errorMessage: null,
  isLogged: !!accessTokenCookie === true,
});
const AuthDispatchContext = createContext<React.Dispatch<IAuthAction> | any>(
  {}
);

export function useAuthState(): IAuthState {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }

  return context;
}

export function useAuthDispatch(): React.Dispatch<IAuthAction> {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }

  return context;
}

export const AuthProvider: React.FC = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
