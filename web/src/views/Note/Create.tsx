import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Redirect, useHistory } from 'react-router-dom';
import { api } from '../../api';
import { useAuthState } from '../../auth';
import SectionForm from '../../components/NoteSection/Form/Section';
import { INote, INoteSection, IQuizAnswer } from '../../types/models';

const NoteCreateView: React.FC = () => {
  const history = useHistory();
  const { isLogged, user } = useAuthState();
  const [sections, setSections] = useState<INoteSection[]>([
    { type: 'text', index: 0 },
  ]);

  const [details, setDetails] = useState({
    title: '',
    description: '',
    userId: user.id,
  });

  const noteMutation = useMutation(
    async (newNote: INote) => await api.post('notes/', newNote),
    {
      onSuccess(data) {
        sections.map(
          async ({ subtitle, content, file, type, answers, index }) => {
            const section: INoteSection = {
              subtitle,
              content,
              type,
              index,
              noteId: (data.data as INote).id!,
            };

            if (type === 'file' || type === 'image' || type === 'voice')
              section.file = file;

            const res = await noteSectionMutation.mutateAsync(section);

            if (type === 'quiz' && res.status === 201) {
              answers?.map(({ answer, isCorrect }) => {
                quizAnswerMutation.mutateAsync({
                  noteSectionId: (res.data as INoteSection).id!,
                  answer,
                  isCorrect,
                });
              });
            }
          }
        );

        history.push(`/notes/${(data.data as INote).id}`);
      }
    }
  );

  const noteSectionMutation = useMutation(
    async (newNoteSection: INoteSection) =>
      await api.post('note-sections/', newNoteSection)
  );

  const quizAnswerMutation = useMutation(
    async (newQuizAnswer: IQuizAnswer) =>
      await api.post('quiz-answers/', newQuizAnswer)
  );

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

  const removeSection = (idx: number) => {
    setSections(() => [...sections.slice(0, idx), ...sections.slice(idx + 1)]);
  };

  const createNote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogged || !details.title.trim()) return;

    const note = {
      title: details.title.trim(),
      description: details.description.trim(),
    };

    await noteMutation.mutateAsync(note);
  };

  if (!isLogged) return <Redirect to="/login" />;

  return (
    <form
      className="container px-5 py-12 mx-auto flex flex-col"
      onSubmit={createNote}
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
        Create note
      </button>
    </form>
  );
};

export default NoteCreateView;
