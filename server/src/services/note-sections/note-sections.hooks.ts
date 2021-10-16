import * as authentication from '@feathersjs/authentication';
import isNoteOwner from '../../hooks/is-note-owner';
import populateQuizQuestions from '../../hooks/populate-quiz-questions';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), isNoteOwner('noteSection')],
    update: [authenticate('jwt'), isNoteOwner('noteSection')],
    patch: [authenticate('jwt'), isNoteOwner('noteSection')],
    remove: [authenticate('jwt'), isNoteOwner('noteSection')],
  },

  after: {
    all: [],
    find: [],
    get: [populateQuizQuestions()],
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
