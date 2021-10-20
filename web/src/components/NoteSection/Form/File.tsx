import React from 'react';
import type { INoteSection } from '../../../types/models';
import Input from '../../Input/Input';

interface Props {
  idx: number;
  section: INoteSection;
  editSection: (idx: number, data: INoteSection) => void;
}

const FileEdit: React.FC<Props> = ({ idx, section, editSection }: Props) => {
  return (
    <Input
      label="File"
      placeholder="File URL"
      name="file"
      type="url"
      required
      value={section.file || ''}
      onChange={(e) => editSection(idx, { ...section, file: e.target.value })}
      className="my-2"
    />
  );
};

export default FileEdit;
