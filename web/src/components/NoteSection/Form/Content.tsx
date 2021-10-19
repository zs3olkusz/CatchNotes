import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { INoteSection } from '../../../types/models';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

interface Props {
  idx: number;
  section: INoteSection;
  editSection: (idx: number, data: INoteSection) => void;
}

const ContentForm: React.FC<Props> = ({ idx, section, editSection }: Props) => {
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={section.content}
        onChange={(content: string) =>
          editSection(idx, { ...section, content })
        }
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default ContentForm;
