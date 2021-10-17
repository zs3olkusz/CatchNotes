// Initializes the `quizAnswers` service on path `/quiz-answers`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { QuizAnswers } from './quiz-answers.class';
import createModel from '../../models/quiz-answers.model';
import hooks from './quiz-answers.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'quiz-answers': QuizAnswers & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
  };

  // Initialize our service with any options it requires
  app.use('/quiz-answers', new QuizAnswers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('quiz-answers');

  service.hooks(hooks);
}
