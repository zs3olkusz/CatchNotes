import React, { useState } from 'react';
import type { INoteSection, IQuizAnswer } from '../../types/models';
import { classNames } from '../../utils/classNames';
import { shuffleArray } from '../../utils/shuffleArray';

interface Props {
  section: INoteSection;
}

const NoteSectionQuiz: React.FC<Props> = ({ section }: Props) => {
  const [showCorrect, setShowCorrect] = useState(false);

  const onSelectAnswer = (e: React.MouseEvent, answer: IQuizAnswer) => {
    const span = (e.target as HTMLElement).parentElement
      ?.lastChild as HTMLElement;

    if (answer.isCorrect) {
      span.classList.add('text-green-700');
    } else {
      span.classList.add('text-red-700');
    }

    const childs =
      (e.target as HTMLInputElement).parentElement?.parentElement?.children ||
      [];
    for (let i = 0; i < childs.length; i++) {
      const child = childs[i].firstChild as HTMLInputElement;

      child.disabled = true;
    }

    setShowCorrect(() => true);
  };

  return (
    <div className="lg:rounded-lg p-1 bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 mb-4">
      <form className="bg-white lg:rounded-lg flex flex-col">
        {shuffleArray(section.answers || []).map((answer: IQuizAnswer) => (
          <label
            key={answer.id}
            htmlFor={`answer-${answer.id}`}
            className="mx-2 inline-flex items-center my-1"
          >
            <input
              type="radio"
              id={`answer-${answer.id}`}
              name={`quiz-${section.id}`}
              className="form-radio h-5 w-5 text-indigo-600"
              onClick={(e) => onSelectAnswer(e, answer)}
            />
            <span
              className={classNames(
                'ml-2',
                showCorrect && answer.isCorrect ? 'text-green-700' : ''
              )}
            >
              {answer.answer}
            </span>
          </label>
        ))}
      </form>
    </div>
  );
};

export default NoteSectionQuiz;
