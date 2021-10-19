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

    const props = {
      key: section.id,
      id: section.id!,
      idx: idx,
      noteId: id,
      noteTitle: data?.title!,
      noteDescription: data?.description!,
      noteAuthor: data?.user!,
      noteCreatedAt: data?.createdAt!,
      noteUpdatedAt: data?.updatedAt!,
      section: section,
    };

    switch (section.type) {
      case 'quiz':
        result = <NoteSectionQuiz {...props} />;
        break;

      case 'image':
        result = <NoteSectionImage {...props} />;
        break;

      case 'voice':
        result = <NoteSectionVoice {...props} />;
        break;

      case 'file':
        result = <NoteSectionFile {...props} />;
        break;

      default:
        result = <NoteSectionText {...props} />;
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
