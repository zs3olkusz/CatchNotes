import assert from 'assert';
import app from '../../src/app';

describe('\'notes\' service', () => {
  it('registered the service', () => {
    const service = app.service('notes');

    assert.ok(service, 'Registered the service');
  });
});
