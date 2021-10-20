import React, { useState } from 'react';
import { useAuthState } from '../auth';
import SectionForm from '../components/NoteSection/Form/Section';
import { INoteSection } from '../types/models';

const NoteCreateView: React.FC = () => {
  const { user } = useAuthState();
  const [sections, setSections] = useState<INoteSection[]>([
    { type: 'quiz', index: 0, noteId: '1' },
  ]);

  const [details, setDetails] = useState({
    title: '',
    description: '',
    userId: user.id,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const addSection = () => {
    setSections((sections) => [
      ...sections,
      { type: 'text', index: 0, noteId: '1' },
    ]);
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

  return (
    <div className="container px-5 py-12 mx-auto flex flex-col">
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
        className="max-w-2xl mx-auto appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      >
        Add section
      </button>
    </div>
  );
};

export default NoteCreateView;
