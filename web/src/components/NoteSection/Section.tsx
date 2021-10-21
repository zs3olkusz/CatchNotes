import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import NoteDetail from './NoteDetail';
import SImage from './Image';
import SQuiz from './Quiz';
import SVoice from './Voice';
import SectionActions from './SectionActions';
import { request } from '../../api';
import { useAuthState } from '../../auth';
import { INoteSection, IUser } from '../../types/models';
import { parseId } from '../../utils/parseId';

interface Props {
  idx: number;
  id: string;
  noteId: string;
  noteTitle: string;
  noteDescription: string;
  noteAuthor: IUser;
  noteCreatedAt: string;
  noteUpdatedAt: string;
  section: INoteSection;
}
const Section: React.FC<Props> = ({
  idx,
  id,
  noteId,
  noteTitle,
  noteDescription,
  noteAuthor,
  noteCreatedAt,
  noteUpdatedAt,
  section,
}: Props) => {
  const { user } = useAuthState();
  const history = useHistory();
  const subtitleId = section?.subtitle ? parseId(section?.subtitle, id) : '';

  const noteDeleteMutation = useMutation(
    async () => await request('DELETE', `notes/${noteId}/`),
    {
      onSuccess: () => history.push('/notes'),
    }
  );

  const parseSection = () => {
    let result;

    const props = {
      key: idx,
      idx,
      id,
      noteId,
      noteTitle,
      noteDescription,
      noteAuthor: user,
      noteCreatedAt,
      noteUpdatedAt,
      section,
    };

    switch (section.type) {
      case 'quiz':
        result = <SQuiz {...props} />;
        break;

      case 'image':
        result = <SImage {...props} />;
        break;

      case 'voice':
        result = <SVoice {...props} />;
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
                title={noteTitle!}
                description={noteDescription!}
                author={noteAuthor}
                createdAt={noteCreatedAt}
                updatedAt={noteUpdatedAt}
                deleteNote={async () => await noteDeleteMutation.mutateAsync()}
              />
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <div className="mb-2">
                  <Link
                    to={`/notes/${noteId}/#${subtitleId}`}
                    className="group"
                    id={subtitleId}
                  >
                    <h3 className="mb-2 text-bold text-xl">
                      {section.subtitle}
                    </h3>
                    <div className="transition-opacity opacity-0 group-hover:opacity-100 w-24 h-1 bg-indigo-300 rounded mt-1 mb-2"></div>
                  </Link>
                </div>

                <div>
                  <div
                    className="leading-relaxed text-xl mb-4"
                    dangerouslySetInnerHTML={{ __html: section.content || '' }}
                  />
                  {parseSection()}
                </div>

                <SectionActions file={section.file || ''} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="mt-4 pt-4 sm:mt-0 text-center sm:text-left w-full">
                <div className="mb-2 w-full">
                  <Link
                    to={`/notes/${noteId}/#${subtitleId}`}
                    className="group"
                    id={subtitleId}
                  >
                    <h3 className="mb-2 text-bold text-xl">
                      {section.subtitle}
                    </h3>
                    <div className="transition-opacity opacity-0 group-hover:opacity-100 w-24 h-1 bg-indigo-300 rounded mt-1 mb-2"></div>
                  </Link>
                </div>

                <div className="w-full">
                  <div
                    className="leading-relaxed text-xl mb-4"
                    dangerouslySetInnerHTML={{ __html: section.content || '' }}
                  />
                  {parseSection()}
                </div>

                <SectionActions file={section.file || ''} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Section;
