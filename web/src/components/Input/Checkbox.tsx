import React from 'react';

function parseLabel(text: string): string {
  return text.toLowerCase().split(' ').join('-');
}

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Checkbox: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  className,
}: Props) => {
  const parsed = parseLabel(label);

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={parsed}
          className="inline-flex items-center mt-3 sm:text-sm"
        >
          <input
            id={parsed}
            name={name}
            type="checkbox"
            className="form-checkbox h-4 w-4 rounded px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            value={value}
            onChange={onChange}
          />

          <span className="ml-2">{label}</span>
        </label>
      )}
    </div>
  );
};

export default Checkbox;
