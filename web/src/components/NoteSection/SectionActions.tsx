import React from 'react';
import { Download } from 'react-feather';

interface Props {
  file: string;
}

const SectionActions: React.FC<Props> = ({ file }: Props) => {
  if (file)
    return (
      <div className="flex">
        <a
          href={file}
          target="_blank"
          download
          className="bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <Download className="w-4 h-4 mr-2" />
          <span>Download</span>
        </a>

        <a className="text-indigo-500 inline-flex items-center">
          Learn More
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    );

  return (
    <a className="text-indigo-500 inline-flex items-center">
      Learn More
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-4 h-4 ml-2"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </a>
  );
};

export default SectionActions;
