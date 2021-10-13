import { Application } from '../declarations';
import notes from './notes/notes.service';
import noteSections from './noteSections/noteSections.service';
import users from './users/users.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(notes);
  app.configure(noteSections);
  app.configure(users);
}
