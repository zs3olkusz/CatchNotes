import React from 'react';
import Input from '../../Input/Input';
import type { INoteSection } from '../../../types/models';

interface Props {
  idx: number;
  section: INoteSection;
  editSection: (idx: number, data: INoteSection) => void;
}

const ImageEdit: React.FC<Props> = ({ idx, section, editSection }: Props) => {
  return (
    <Input
      label="Image"
      placeholder="Image URL"
      name="image"
      type="url"
      required
      value={section.file || ''}
      onChange={(e) => editSection(idx, { ...section, file: e.target.value })}
      className="my-2"
    />
  );
};

export default ImageEdit;
