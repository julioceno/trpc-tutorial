import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

const response = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description 2',
  },
];

export const appRouter = router({
  hello: publicProcedure.query((req) => {
    return 'hello 2';
  }),

  getProducts: publicProcedure.query((req) => {
    return response;
  }),

  createProduct: publicProcedure.input(z.string()).mutation(({ input }) => {
    const id = response.length + 1;
    const newProduct = {
      id,
      name: input,
      description: '',
    };

    response.push(newProduct);
    return 'product created';
  }),
});

export type AppRouter = typeof appRouter;
