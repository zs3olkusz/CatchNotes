import * as authentication from '@feathersjs/authentication';
import isNoteOwner from '../../hooks/is-note-owner';
import getUser from '../../hooks/get-user';
import populateUser from '../../hooks/populate-user';
import populateNoteSections from '../../hooks/populate-note-sections';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), getUser()],
    update: [authenticate('jwt'), isNoteOwner('note')],
    patch: [authenticate('jwt'), isNoteOwner('note')],
    remove: [authenticate('jwt'), isNoteOwner('note')],
  },

  after: {
    all: [],
    find: [],
    get: [populateUser(), populateNoteSections()],
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
