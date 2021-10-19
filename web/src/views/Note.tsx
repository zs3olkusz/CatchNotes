import React from 'react';
import { useQuery } from 'react-query';
import type { UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';
import { request } from '../api';
import NoteSectionText from '../components/NoteSection/Text';
import NoteSectionQuiz from '../components/NoteSection/Quiz';
import NoteSectionImage from '../components/NoteSection/Image';
import NoteSectionVoice from '../components/NoteSection/Voice';
import NoteSectionFile from '../components/NoteSection/File';
import type { INote, INoteSection } from '../types/models';

const getNoteById = async (id: string) => {
  const { data } = await request<INote>('GET', `notes/${id}`);
  return data;
};

function useNote(id: string): UseQueryResult<INote, Error> {
  return useQuery<INote, Error>(
    ['note', id],
    async () => await getNoteById(id),
    {
      enabled: !!id,
    }
  );
}

const NoteView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { status, data, error } = useNote(id);

  const parseSection = (section: INoteSection, idx: number) => {
    let result;

    switch (section.type) {
      case 'quiz':
        result = (
          <NoteSectionQuiz
            key={section.id}
            idx={idx}
            noteId={id}
            noteTitle={data?.title!}
            noteDescription={data?.description!}
            noteAuthor={data?.user!}
            noteCreatedAt={data?.createdAt!}
            noteUpdatedAt={data?.updatedAt!}
            section={section}
          />
        );
        break;

      case 'image':
        result = (
          <NoteSectionImage
            key={section.id}
            idx={idx}
            noteId={id}
            noteTitle={data?.title!}
            noteDescription={data?.description!}
            noteAuthor={data?.user!}
            noteCreatedAt={data?.createdAt!}
            noteUpdatedAt={data?.updatedAt!}
            section={section}
          />
        );
        break;

      case 'voice':
        result = (
          <NoteSectionVoice
            key={section.id}
            idx={idx}
            noteId={id}
            noteTitle={data?.title!}
            noteDescription={data?.description!}
            noteAuthor={data?.user!}
            noteCreatedAt={data?.createdAt!}
            noteUpdatedAt={data?.updatedAt!}
            section={section}
          />
        );
        break;

      case 'file':
        result = (
          <NoteSectionFile
            key={section.id}
            idx={idx}
            noteId={id}
            noteTitle={data?.title!}
            noteDescription={data?.description!}
            noteAuthor={data?.user!}
            noteCreatedAt={data?.createdAt!}
            noteUpdatedAt={data?.updatedAt!}
            section={section}
          />
        );
        break;

      default:
        result = (
          <NoteSectionText
            key={section.id}
            idx={idx}
            noteId={id}
            noteTitle={data?.title!}
            noteDescription={data?.description!}
            noteAuthor={data?.user!}
            noteCreatedAt={data?.createdAt!}
            noteUpdatedAt={data?.updatedAt!}
            section={section}
          />
        );
        break;
    }

    return result;
  };

  return (
    <div>
      {status === 'loading' ? (
        <p>loading...</p>
      ) : status === 'error' ? (
        <p>{error?.message || error}</p>
      ) : (
        data && (
          <>{data.sections.map((section, idx) => parseSection(section, idx))}</>
        )
      )}
    </div>
  );
};

export default NoteView;
