// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, method, result } = context;

    const addQuizAnswer = async (data: any) => {
      if (data.type !== 'quiz') return data;

      const quizAnswers = await app.service('quiz-answers').find({
        query: {
          noteSectionId: data.id,
        },
      });

      return {
        ...data,
        answers: quizAnswers || [],
      };
    };

    if (method === 'find') {
      context.result.data = await Promise.all(result.data.map(addQuizAnswer));
    } else {
      context.result = await addQuizAnswer(result);
    }
    return context;
  };
};
