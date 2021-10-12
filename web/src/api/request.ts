import axios from 'axios';
import type { AxiosResponse, Method } from 'axios';
import { Cookies } from 'react-cookie';

const baseURL = 'http://127.0.0.1:3030/';
const cookies = new Cookies();

export const api = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    Authorization: cookies.get('access_token')
      ? `Bearer ${cookies.get('access_token')}`
      : '',
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Prevent infinite loops early
    if (error.response.status === 401) {
      window.location.href = '/login/';

      return Promise.reject(error);
    }

    if (
      error.response.data.code === 'token_not_valid' &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      window.location.href = '/login/';
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export const request = <T>(
  method: Method,
  url: string,
  params?: unknown
): Promise<AxiosResponse<T>> => {
  return api.request<T>({
    method,
    url,
    params,
  });
};

// Define a default query function that will receive the query key
export const defaultQueryFn = async ({ queryKey }: any): Promise<unknown> => {
  const data = await request(queryKey[0], queryKey[1], queryKey[2]);
  return data;
};
