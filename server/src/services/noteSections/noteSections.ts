import { setTimestamp } from '../../hooks/timestamp';

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [setTimestamp('createdAt')],
    update: [setTimestamp('updatedAt')],
    patch: [],
    remove: [],
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
