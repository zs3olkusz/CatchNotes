import { Params } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';

interface QuizQuestionData {
  id?: string;
  text: string;
  noteSectionId: string;
}

export class QuizQuestions extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  create(data: QuizQuestionData, params?: Params) {
    const { text, noteSectionId } = data;

    const quizQuestionData = {
      text,
      noteSectionId,
    };

    return super.create(quizQuestionData, params);
  }

  update(id: string, data: QuizQuestionData, params?: Params) {
    const { text } = data;

    const quizQuestionData = {
      text,
    };

    return super.update(id, quizQuestionData, params);
  }
}
