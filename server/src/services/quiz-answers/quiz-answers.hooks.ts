import * as authentication from '@feathersjs/authentication';
import isNoteOwner from '../../hooks/is-note-owner';
import canAddQuestion from '../../hooks/can-add-question';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), isNoteOwner('quizAnswer'), canAddQuestion()],
    update: [authenticate('jwt'), isNoteOwner('quizAnswer')],
    patch: [authenticate('jwt'), isNoteOwner('quizAnswer')],
    remove: [authenticate('jwt'), isNoteOwner('quizAnswer')],
  },

  after: {
    all: [],
    find: [],
    get: [],
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
