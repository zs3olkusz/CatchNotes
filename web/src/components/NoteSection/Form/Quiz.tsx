import React, { useState } from 'react';
import type { INoteSection } from '../../../types/models';
import Checkbox from '../../Input/Checkbox';
import Input from '../../Input/Input';

interface Props {
  idx: number;
  section: INoteSection;
  editSection: (idx: number, data: INoteSection) => void;
}

const QuizEdit: React.FC<Props> = ({ idx, section, editSection }: Props) => {
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const addAnswer = () => {
    const text = answer.trim();

    if (!text) return;

    editSection(idx, {
      ...section,
      answers: [...(section.answers || []), { answer, isCorrect }],
    });
  };

  return (
    <div>
      <Input
        label="Quiz answer"
        placeholder="Answer"
        name="answer"
        type="text"
        required
        value={answer}
        onChange={(e) => setAnswer(() => e.target.value)}
        className="my-2"
      />
      <Checkbox
        label="Is correct"
        name="isCorrect"
        value={String(isCorrect)}
        onChange={(e) => setIsCorrect(() => !!e.target.value)}
        className="my-2"
      />

      <button onClick={addAnswer}>Add</button>
    </div>
  );
};

export default QuizEdit;
