import React from 'react';
import type { INoteSection } from '../../types/models';

interface Props {
  section: INoteSection;
}

const NoteSectionImage: React.FC<Props> = ({ section }: Props) => {
  return (
    <div className="lg:rounded-lg p-1 bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400">
      <img
        className="lg:rounded-lg lg:h-full"
        src={section.file}
        alt={`Section '${section.subtitle}' image`}
      />
    </div>
  );
};

export default NoteSectionImage;
