import React from 'react';
import { Download, Edit } from 'react-feather';

interface Props {
  file: string;
}

const SectionActions: React.FC<Props> = ({ file }: Props) => {
  return (
    <div className="grid grid-cols-2 mt-2">
      {file ? (
        <a
          href={file}
          target="_blank"
          download
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded inline-flex items-center w-36"
          rel="noreferrer"
        >
          <Download className="w-4 h-4 mr-2" />
          <span>Download</span>
        </a>
      ) : (
        <div />
      )}

      <button
        className="place-self-end appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-500 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:text-indigo-500 focus:z-10 sm:text-sm text-center"
        title="edit section"
      >
        <Edit />
      </button>
    </div>
  );
};

export default SectionActions;
