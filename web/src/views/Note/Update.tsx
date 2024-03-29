import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Redirect, useHistory } from 'react-router-dom';
import { api, request } from '../../api';
import { useAuthState } from '../../auth';
import SectionForm from '../../components/NoteSection/Form/Section';
import { INote, INoteSection, IQuizAnswer } from '../../types/models';

interface Props {
  id: string;
  status: 'idle' | 'error' | 'loading' | 'success';
  data: INote | undefined;
  error: Error | null;
}

const NoteUpdateView: React.FC<Props> = ({
  id,
  status,
  data,
  error,
}: Props) => {
  const { isLogged, user } = useAuthState();
  const history = useHistory();

  const [sections, setSections] = useState<INoteSection[]>(
    data?.sections || [{ type: 'text', index: 0 }]
  );

  const [details, setDetails] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (status === 'success' && data) {
      setDetails((details) => ({
        ...details,
        title: data.title,
        description: data.description,
      }));
    }
  }, [data]);

  const noteMutation = useMutation(
    async (data: INote) => await api.patch(`notes/${id}`, data)
  );

  const noteSectionMutation = useMutation(async (data: INoteSection) => {
    data.id
      ? await api.patch(`note-sections/${data.id}`, data)
      : await api.post('note-sections/', data);
  });

  const quizAnswerMutation = useMutation(async (data: IQuizAnswer) => {
    data.id
      ? await api.patch(`quiz-answers/${data.id}`, data)
      : await api.post('quiz-answers/', data);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const addSection = () => {
    setSections((sections) => [...sections, { type: 'text', index: 0 }]);
  };

  const editSection = (idx: number, data: INoteSection) => {
    setSections((sections) => [
      ...sections.slice(0, idx),
      { ...sections.slice(idx, idx + 1), ...data },
      ...sections.slice(idx + 1),
    ]);
  };

  const sectionDeleteMutation = useMutation(
    async (id: string) => await request('DELETE', `note-sections/${id}/`)
  );

  const removeSection = async (idx: number) => {
    sections[idx].id &&
      (await sectionDeleteMutation.mutateAsync(sections[idx].id!));

    setSections(() => [...sections.slice(0, idx), ...sections.slice(idx + 1)]);
  };

  const updateNote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogged || !details.title.trim()) return;

    const note = {
      id,
      title: details.title.trim(),
      description: (details.description || '').trim(),
    };
    const result = await noteMutation.mutateAsync(note);

    if (
      noteMutation.isSuccess &&
      noteMutation.isError === false &&
      (result.status === 201 || result.status === 200)
    ) {
      sections.map(
        async ({ id, subtitle, content, file, type, answers, index }) => {
          const data: INoteSection = {
            id,
            subtitle,
            content,
            type,
            index,
            noteId: (result.data as INote).id!,
          };

          if (type === 'file' || type === 'image' || type === 'voice')
            data.file = file;

          const res: any = await noteSectionMutation.mutateAsync(data);

          if (type === 'quiz' && (res.status === 201 || res.status === 200)) {
            answers?.map(({ id, answer, isCorrect }) => {
              quizAnswerMutation.mutateAsync({
                id,
                noteSectionId: (res.data as INoteSection).id!,
                answer,
                isCorrect,
              });
            });
          }
        }
      );

      history.push(`/notes/${id}`);
    }
  };

  if (!isLogged || user.id !== data?.user?.id) return <Redirect to="/login" />;

  return (
    <form
      className="container px-5 py-12 mx-auto flex flex-col"
      onSubmit={updateNote}
    >
      {sections.map((section, idx) => (
        <SectionForm
          key={idx}
          idx={idx}
          noteTitle={details.title}
          noteDescription={details.description}
          noteAuthor={user}
          section={section}
          editSection={editSection}
          removeSection={removeSection}
          handleInputChange={handleInputChange}
        />
      ))}
      <button
        onClick={addSection}
        className="max-w-2xl mx-auto appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-2"
      >
        Add section
      </button>
      <button
        type="submit"
        className="max-w-2xl mx-auto appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        disabled={noteMutation.isLoading}
      >
        Update note
      </button>
    </form>
  );
};

export default NoteUpdateView;
