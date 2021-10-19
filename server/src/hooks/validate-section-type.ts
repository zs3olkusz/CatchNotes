/* eslint-disable indent */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { Conflict } from '@feathersjs/errors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { method } = context;

    if (method === 'create') {
      const { file, type } = context.data;

      switch (type) {
        case 'file':
        case 'image':
        case 'voice':
          if (!file)
            throw new Conflict(
              `Cannot create note section of type ${type} without file`
            );
          break;

        default:
          delete context.data.file;
          break;
      }
    }

    return context;
  };
};
