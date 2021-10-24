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

      const parsed: any[] = [];

      for (let i = 0; i < noteSections.length; i++) {
        const section = noteSections[i];

        if (section.type !== 'quiz') {
          parsed.push(section);
          continue;
        }

        parsed.push({
          ...section,
          answers: await app.service('quiz-answers').find({
            query: {
              noteSectionId: section.id,
            },
          }),
        });
      }

      return {
        ...data,
        sections: parsed,
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
