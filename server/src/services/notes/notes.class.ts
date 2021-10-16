import { Params } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';

interface NoteData {
  id?: string;
  title: string;
  userId: string;
}

export class Notes extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  create(data: NoteData, params?: Params) {
    const { title, userId } = data;

    const noteData = {
      title,
      userId,
    };

    return super.create(noteData, params);
  }

  update(id: string, data: NoteData, params?: Params) {
    const { title } = data;

    const noteData = {
      title,
    };

    return super.update(id, noteData, params);
  }
}
