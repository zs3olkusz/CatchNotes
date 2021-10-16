// Initializes the `quizQuestions` service on path `/quiz-questions`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { QuizQuestions } from './quiz-questions.class';
import createModel from '../../models/quiz-questions.model';
import hooks from './quiz-questions.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'quiz-questions': QuizQuestions & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/quiz-questions', new QuizQuestions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('quiz-questions');

  service.hooks(hooks);
}
