import { HookContext } from '@feathersjs/feathers';

export const setTimestamp = (name: string) => {
  return async (context: HookContext) => {
    context.data[name] = new Date();

    return context;
  };
};
