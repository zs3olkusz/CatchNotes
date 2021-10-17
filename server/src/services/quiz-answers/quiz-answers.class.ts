import { Params } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';

interface QuizAnswerData {
  id?: string;
  answer: string;
  noteSectionId: string;
}

export class QuizAnswers extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  create(data: QuizAnswerData, params?: Params) {
    const { answer, noteSectionId } = data;

    const quizAnswerData = {
      answer,
      noteSectionId,
    };

    return super.create(quizAnswerData, params);
  }

  update(id: string, data: QuizAnswerData, params?: Params) {
    const { answer } = data;

    const quizAnswerData = {
      answer,
    };

    return super.update(id, quizAnswerData, params);
  }
}
