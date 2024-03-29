import { Application } from '../declarations';
import users from './users/users.service';
import notes from './notes/notes.service';
import noteSections from './note-sections/note-sections.service';
import quizAnswers from './quiz-answers/quiz-answers.service';
import messages from './messages/messages.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(notes);
  app.configure(noteSections);
  app.configure(quizAnswers);
  app.configure(messages);
}
