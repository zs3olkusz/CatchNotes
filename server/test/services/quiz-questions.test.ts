import assert from 'assert';
import app from '../../src/app';

describe('\'quizQuestions\' service', () => {
  it('registered the service', () => {
    const service = app.service('quiz-questions');

    assert.ok(service, 'Registered the service');
  });
});
