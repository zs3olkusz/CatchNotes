import React from 'react';
import { X } from 'react-feather';
import SelectInput from '../../Input/Select';
import { INoteSectionType } from '../../../types/models';

interface Props {
  idx: number;
  type: INoteSectionType;
  setType: (type: string) => void;
  removeSection: (idx: number) => void;
}

const SectionActions: React.FC<Props> = ({
  idx,
  type,
  setType,
  removeSection,
}: Props) => {
  return (
    <div className="flex">
      <SelectInput
        data={['text', 'quiz', 'file', 'image', 'voice']}
        selected={type}
        setSelected={setType}
        className="w-28 3xl:w-full"
        rounded={{ top: true, bottom: true }}
      />

      <div className="flex-grow"></div>

      <button
        className="flex flex-end items-center justify-center border-none outline-none rounded-md text-base font-medium hover:text-indigo-700 mt-1"
        onClick={() => removeSection(idx)}
        title="Remove section"
      >
        <X />
      </button>
    </div>
  );
};

export default SectionActions;
