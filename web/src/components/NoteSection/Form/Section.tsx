import React from 'react';
import NoteDetail from './NoteDetail';
import FileEdit from './File';
import ImageEdit from './Image';
import QuizEdit from './Quiz';
import VoiceEdit from './Voice';
import SectionActions from './SectionActions';
import ContentForm from './Content';
import Input from '../../Input/Input';
import { useAuthState } from '../../../auth';
import type { INoteSection, IUser } from '../../../types/models';

interface Props {
  idx: number;
  noteId?: string;
  noteTitle?: string;
  noteDescription?: string;
  noteAuthor: IUser;
  noteCreatedAt?: string;
  noteUpdatedAt?: string;
  section: INoteSection;
  editSection: (idx: number, data: INoteSection) => void;
  removeSection: (idx: number) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SectionForm: React.FC<Props> = ({
  idx,
  noteId,
  noteTitle,
  noteDescription,
  noteAuthor,
  noteCreatedAt,
  noteUpdatedAt,
  section,
  editSection,
  removeSection,
  handleInputChange,
}: Props) => {
  const { user } = useAuthState();

  const parseSection = () => {
    let result;

    const props = {
      key: idx,
      idx,
      noteId,
      noteTitle,
      noteDescription,
      noteAuthor: user,
      noteCreatedAt,
      noteUpdatedAt,
      section,
      editSection,
      removeSection,
      handleInputChange,
    };

    switch (section.type) {
      case 'quiz':
        result = <QuizEdit {...props} />;
        break;

      case 'image':
        result = <ImageEdit {...props} />;
        break;

      case 'voice':
        result = <VoiceEdit {...props} />;
        break;

      case 'file':
        result = <FileEdit {...props} />;
        break;

      default:
        result = <></>;
        break;
    }

    return result;
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          {idx === 0 ? (
            <div className="flex flex-col sm:flex-row mt-10">
              <NoteDetail
                title={noteTitle || ''}
                description={noteDescription || ''}
                author={noteAuthor}
                handleInputChange={handleInputChange}
              />
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <Input
                  name={`subtitle-${idx}`}
                  placeholder="Subtitle"
                  type="text"
                  required
                  value={section.subtitle || ''}
                  onChange={(e) =>
                    editSection(idx, { ...section, subtitle: e.target.value })
                  }
                  className="mb-2 w-full"
                  rounded={{ top: true, bottom: true }}
                />

                <div>
                  <ContentForm
                    idx={idx}
                    section={section}
                    editSection={editSection}
                  />
                  {parseSection()}
                </div>

                <SectionActions
                  idx={idx}
                  type={section.type}
                  setType={(type: any) =>
                    editSection(idx, { ...section, type })
                  }
                  removeSection={removeSection}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="mt-4 pt-4 sm:mt-0 text-center sm:text-left w-full">
                <Input
                  name={`subtitle-${idx}`}
                  placeholder="Subtitle"
                  type="text"
                  required
                  value={section.subtitle || ''}
                  onChange={(e) =>
                    editSection(idx, { ...section, subtitle: e.target.value })
                  }
                  className="mb-2 w-full"
                  rounded={{ top: true, bottom: true }}
                />

                <div className="w-full">
                  <ContentForm
                    idx={idx}
                    section={section}
                    editSection={editSection}
                  />
                  {parseSection()}
                </div>

                <SectionActions
                  idx={idx}
                  type={section.type}
                  setType={(type: any) =>
                    editSection(idx, { ...section, type })
                  }
                  removeSection={removeSection}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SectionForm;
