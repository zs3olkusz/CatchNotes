// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { NoteSections } from './noteSections.class';
import createModel from '../../models/noteSections.model';
import hooks from './noteSections';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    noteSections: NoteSections & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
  };

  // Initialize our service with any options it requires
  app.use('/note-sections', new NoteSections(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('noteSections');

  service.hooks(hooks);
}
