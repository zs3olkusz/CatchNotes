import React from 'react';
import { Link } from 'react-router-dom';
import type { INoteSection, IUser } from '../../types/models';
import { parseId } from '../../utils/parseId';
import NoteDetail from './NoteDetail';
import SectionActions from './SectionActions';

interface Props {
  idx?: number;
  noteId: string;
  noteTitle: string;
  noteDescription: string;
  noteAuthor: IUser;
  noteCreatedAt: string;
  noteUpdatedAt: string;
  section: INoteSection;
}

const NoteSectionVoice: React.FC<Props> = ({
  idx,
  noteId,
  noteTitle,
  noteDescription,
  noteAuthor,
  noteCreatedAt,
  noteUpdatedAt,
  section,
}: Props) => {
  const subtitleId = section?.subtitle ? parseId(section?.subtitle) : '';

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          {idx === 0 ? (
            <div className="flex flex-col sm:flex-row mt-10">
              <NoteDetail
                title={noteTitle}
                description={noteDescription}
                author={noteAuthor}
                createdAt={noteCreatedAt}
                updatedAt={noteUpdatedAt}
              />
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                {section.subtitle && (
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
                )}

                <div>
                  {section.content && (
                    <p className="leading-relaxed text-xl mb-4">
                      {section.content}
                    </p>
                  )}

                  <div className="lg:rounded-lg p-1 bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400">
                    <audio>
                      <source src={section.file} type="audio/mp3" />
                    </audio>
                  </div>
                </div>

                <SectionActions />
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                {section.subtitle && (
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
                )}

                <div>
                  {section.content && (
                    <p className="leading-relaxed text-xl mb-4">
                      {section.content}
                    </p>
                  )}

                  <div className="lg:rounded-lg p-1 bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 mb-4">
                    <audio controls>
                      <source src={section.file} type="audio/mp3" />
                    </audio>
                  </div>
                </div>

                <SectionActions />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NoteSectionVoice;