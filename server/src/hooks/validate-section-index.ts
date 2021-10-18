// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, method, result } = context;

    const getBiggestIndex = async (noteId: string): Promise<number> => {
      const result = await app.service('note-sections').find({
        query: {
          noteId,
          $limit: 1,
          $sort: {
            index: -1,
          },
        },
      });

      if (!result.length) return -1;

      const idx = (result as any[])[0].index; // if there is no results this could return undefined

      return idx !== undefined ? idx : -1;
    };

    const changeIndexes = async (
      index: number,
      noteId: string
    ): Promise<void> => {
      const results = (await app.service('note-sections').find({
        query: {
          noteId,
          index: {
            $gte: index,
          },
        },
      })) as any[];

      results.map(
        async (result) =>
          await app
            .service('note-sections')
            .update(result.id, { index: index++ })
      );
    };

    if (method === 'create') {
      const { index, noteId } = context.data;

      const biggestIndex = await getBiggestIndex(noteId);

      if (!index) {
        context.data.index = biggestIndex + 1;
      } else if (biggestIndex >= index) {
        await changeIndexes(index, noteId);
        context.data.index = index;
      } else {
        context.data.index = biggestIndex + 1;
      }
    } else if (method === 'patch' || method === 'update') {
      const { index } = context.data;
      const { noteId } = result.data;

      const biggestIndex = await getBiggestIndex(noteId);

      if (!index) {
        // if index is not being updated we are passing validation
        return context;
      } else if (biggestIndex >= index) {
        await changeIndexes(index, noteId);
        context.data.index = index;
      } else {
        context.data.index = biggestIndex + 1;
      }
    }

    return context;
  };
};
