// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, method, result } = context;

    const addNoteSection = async (data: any) => {
      const noteSections = await app.service('note-sections').find({
        query: {
          noteId: data.id,
        },
      });

      return {
        ...data,
        sections: noteSections,
      };
    };

    if (method === 'find') {
      context.result.data = await Promise.all(result.data.map(addNoteSection));
    } else {
      context.result = await addNoteSection(result);
    }

    return context;
  };
};
