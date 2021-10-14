// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { NotAuthenticated } from '@feathersjs/errors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, method, params } = context;
    const user = params.user;

    if (['find', 'get', 'create'].indexOf(method) !== -1) {
      return context;
    }

    const note = await app.service('notes').get(context.id, params);

    if (note?.userId && note?.userId !== user?.id) {
      throw new NotAuthenticated('Access denied');
    } else if (note?.noteId && note?.userId !== user?.id) {
      throw new NotAuthenticated('Access denied');
    }

    return context;
  };
};
