import { useQuery } from 'react-query';

import { request } from '../api';
import { IUser } from '../types/models';

const getUserById = async (id: string) => {
  const { data } = await request<IUser>('GET', `users/${id}`);
  return data;
};

export function useUser(userId: string): any {
  return useQuery(['user', userId], async () => await getUserById(userId), {
    enabled: !!userId,
  });
}
