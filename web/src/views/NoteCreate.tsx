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
    <div>
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
      <button onClick={addSection}>add</button>
    </div>
  );
};

export default NoteCreateView;
