import * as authentication from '@feathersjs/authentication';
import isNoteOwner from '../../hooks/is-note-owner';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), isNoteOwner('quizQuestion')],
    update: [authenticate('jwt'), isNoteOwner('quizQuestion')],
    patch: [authenticate('jwt'), isNoteOwner('quizQuestion')],
    remove: [authenticate('jwt'), isNoteOwner('quizQuestion')],
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