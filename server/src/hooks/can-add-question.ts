// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { Conflict } from '@feathersjs/errors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app } = context;

    const id = context.data.noteSectionId;

    const noteSection = await app.service('note-sections').get(id);

    if (noteSection.type !== 'quiz')
      throw new Conflict(
        'Cannot create answer to section which type is not quiz'
      );

    return context;
  };
};
