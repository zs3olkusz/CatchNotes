import React from 'react';
import { useParams } from 'react-router-dom';

const NoteView: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return <div></div>;
};

export default NoteView;
