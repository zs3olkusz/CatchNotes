import assert from 'assert';
import app from '../../src/app';

describe('\'noteSections\' service', () => {
  it('registered the service', () => {
    const service = app.service('note-sections');

    assert.ok(service, 'Registered the service');
  });
});
