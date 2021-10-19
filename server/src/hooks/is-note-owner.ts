/* eslint-disable indent */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { NotAuthenticated } from '@feathersjs/errors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (model: string): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, method, params } = context;
    const user = params.user;

    if (['find', 'get', 'create'].indexOf(method) !== -1) {
      return context;
    }

    switch (model) {
      case 'note': {
        const note = await app.service('notes').get(context.id);

        if (note?.userId !== user?.id) {
          throw new NotAuthenticated('Access denied');
        }

        break;
      }

      case 'noteSection': {
        const noteSection = await app.service('note-sections').get(context.id);

        const id = noteSection.noteId;
        const note = await app.service('notes').get(id);

        if (note?.userId !== user?.id) {
          throw new NotAuthenticated('Access denied');
        }

        break;
      }

      case 'quizQuestion': {
        const quizQuestion = await app
          .service('quiz-questions')
          .get(context.id);

        let id = quizQuestion.noteSectionId;
        const noteSection = await app.service('note-sections').get(id, params);

        id = noteSection.noteId;
        const note = await app.service('notes').get(id);

        if (note?.userId !== user?.id) {
          throw new NotAuthenticated('Access denied');
        }

        break;
      }

      default:
        break;
    }

    return context;
  };
};
