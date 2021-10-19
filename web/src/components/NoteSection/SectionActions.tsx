import React from 'react';

const SectionActions: React.FC = () => {
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
