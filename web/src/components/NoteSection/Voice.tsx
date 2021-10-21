import React from 'react';
import type { INoteSection } from '../../types/models';

interface Props {
  section: INoteSection;
}

const NoteSectionVoice: React.FC<Props> = ({ section }: Props) => {
  return (
    <div className="lg:rounded-lg p-1 bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400">
      <audio>
        <source src={section.file} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default NoteSectionVoice;
