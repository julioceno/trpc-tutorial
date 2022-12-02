import express from 'express';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { AnyRouter } from '@trpc/server';
import { appRouter } from './routes';

const app = express();
/* const appRouter = trpc.router();

appRouter.query('hello', {
  resolve() {
    return 'Hello world';
  },
}); */

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(3000, () => console.log('listening on port 3000 🚀'));
