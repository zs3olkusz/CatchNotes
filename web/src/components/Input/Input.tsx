import React from 'react';
import { classNames } from '../../utils/classNames';

function parseLabel(text: string): string {
  return text.toLowerCase().split(' ').join('-');
}

interface Props {
  label?: string;
  name: string;
  placeholder: string;
  autoComplete?: string;
  type: React.HTMLInputTypeAttribute | undefined;
  required: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  rounded?: { top?: boolean; bottom?: boolean };
}

const Input: React.FC<Props> = ({
  label,
  name,
  placeholder,
  autoComplete,
  type,
  required = false,
  value,
  onChange,
  className,
  rounded,
}: Props) => {
  const parsed = parseLabel(label || '');

  return (
    <div className={className}>
      {label && (
        <label htmlFor={parsed} className="sr-only">
          {label}
        </label>
      )}

      <input
        id={parsed}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className={classNames(
          'appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
          rounded?.top ? 'rounded-t-md' : '',
          rounded?.bottom ? 'rounded-b-md' : ''
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
