// Initializes the `noteSections` service on path `/note-sections`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { NoteSections } from './note-sections.class';
import createModel from '../../models/note-sections.model';
import hooks from './note-sections.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'note-sections': NoteSections & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/note-sections', new NoteSections(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('note-sections');

  service.hooks(hooks);
}
