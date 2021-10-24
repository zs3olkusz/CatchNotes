import React from 'react';
import Input from '../../Input/Input';
import type { INoteSection } from '../../../types/models';

interface Props {
  idx: number;
  section: INoteSection;
  editSection: (idx: number, data: INoteSection) => void;
}

const VoiceEdit: React.FC<Props> = ({ idx, section, editSection }: Props) => {
  return (
    <Input
      label="Voice"
      placeholder="Voice URL"
      name="voice"
      type="url"
      required
      value={section.file || ''}
      onChange={(e) => editSection(idx, { ...section, file: e.target.value })}
      className="my-2"
      rounded={{ top: true, bottom: true }}
    />
  );
};

export default VoiceEdit;
