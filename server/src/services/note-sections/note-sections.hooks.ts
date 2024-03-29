import * as authentication from '@feathersjs/authentication';
import isNoteOwner from '../../hooks/is-note-owner';
import populateQuizAnswers from '../../hooks/populate-quiz-answers';
import validateSectionIndex from '../../hooks/validate-section-index';
import validateSectionType from '../../hooks/validate-section-type';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      authenticate('jwt'),
      isNoteOwner('noteSection'),
      validateSectionIndex(),
      validateSectionType(),
    ],
    update: [
      authenticate('jwt'),
      isNoteOwner('noteSection'),
      validateSectionIndex(),
      validateSectionType(),
    ],
    patch: [
      authenticate('jwt'),
      isNoteOwner('noteSection'),
      validateSectionIndex(),
      validateSectionType(),
    ],
    remove: [authenticate('jwt'), isNoteOwner('noteSection')],
  },

  after: {
    all: [],
    find: [],
    get: [populateQuizAnswers()],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
