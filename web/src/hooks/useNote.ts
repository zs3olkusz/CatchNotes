import { useQuery, UseQueryResult } from 'react-query';
import { request } from '../api';
import { INote } from '../types/models';

const getNoteById = async (id: string) => {
  const { data } = await request<INote>('GET', `notes/${id}`);
  return data;
};

export function useNote(id: string): UseQueryResult<INote, Error> {
  return useQuery<INote, Error>(
    ['note', id],
    async () => await getNoteById(id),
    {
      enabled: !!id,
    }
  );
}
