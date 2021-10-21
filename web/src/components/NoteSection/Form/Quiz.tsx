import React, { useState } from 'react';
import { Check, X } from 'react-feather';
import Input from '../../Input/Input';
import Checkbox from '../../Input/Checkbox';
import type { INoteSection } from '../../../types/models';

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

    setAnswer('');
  };

  return (
    <div>
      <div>
        <h3 className="font-bold text-lg mt-2">Answers</h3>

        {section.answers?.map((answer, i) => (
          <p className="flex items-center my-1" key={i}>
            {answer.isCorrect ? (
              <Check className="text-green-400" />
            ) : (
              <X className="text-red-500" />
            )}

            <span className="block ml-1">{answer.answer}</span>
          </p>
        ))}
      </div>

      <Input
        label="Quiz answer"
        placeholder="Answer"
        name="answer"
        type="text"
        required={false}
        value={answer}
        onChange={(e) => setAnswer(() => e.target.value)}
        className="my-2"
      />
      <Checkbox
        label="Is correct"
        name="isCorrect"
        value={String(isCorrect)}
        onChange={(e) => setIsCorrect(() => e.target.checked)}
        className="my-2"
      />

      <button
        onClick={addAnswer}
        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      >
        Add
      </button>
    </div>
  );
};

export default QuizEdit;
