// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, method, result } = context;

    const addQuizQuestion = async (data: any) => {
      if (data.type !== 'quiz') return data;

      const quizQuestions = await app.service('quiz-question').find({
        query: {
          // TODO: add changable note section limit per page
          noteSectionId: data.id,
        },
      });

      return {
        ...data,
        questions: quizQuestions || [],
      };
    };

    // TODO: add when withQuestions (query parameter) is in url
    if (method === 'find') {
      context.result.data = await Promise.all(result.data.map(addQuizQuestion));
    } else {
      context.result = await addQuizQuestion(result);
    }
    return context;
  };
};
