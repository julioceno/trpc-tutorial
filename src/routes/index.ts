import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export const appRouter = t.router({
  hello: t.procedure.query((req) => {
    const {} = req;

    return 'hello 2';
  }),
});

export type AppRouter = typeof appRouter;
