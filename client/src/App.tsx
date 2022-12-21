import { QueryClient, QueryClientProvider } from 'react-query';
import { trpc } from './trpc';
import { useState } from 'react';
import { httpBatchLink } from '@trpc/client';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/trpc',
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function AppContent() {
  /* const helloMessage = trpc.hello.useQuery(); */

  return <div>Hello world</div>;
}

export default App;
