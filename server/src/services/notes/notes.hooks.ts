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
    update: [authenticate('jwt'), isNoteOwner()],
    patch: [authenticate('jwt'), isNoteOwner()],
    remove: [authenticate('jwt'), isNoteOwner()],
  },

  after: {
    all: [populateUser()],
    find: [populateNoteSections()],
    get: [populateNoteSections()],
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
