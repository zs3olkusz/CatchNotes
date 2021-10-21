import React from 'react';
import type { INoteSection, IQuizAnswer } from '../../types/models';
import { shuffleArray } from '../../utils/shuffleArray';

interface Props {
  section: INoteSection;
}

const NoteSectionQuiz: React.FC<Props> = ({ section }: Props) => {
  return (
    <div className="lg:rounded-lg p-1 bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 mb-4">
      <form className="bg-white lg:rounded-lg">
        {shuffleArray(section.answers || []).map((answer: IQuizAnswer) => (
          <div key={answer.id}>
            <input type="radio" name={`answer-${answer.id}`} />
            {answer.answer}
          </div>
        ))}
      </form>
    </div>
  );
};

export default NoteSectionQuiz;
