import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
  const [newProduct, setNewProduct] = useState('');
  const getProducts = trpc.getProducts.useQuery();
  const addProduct = trpc.createProduct.useMutation();

  const client = trpc.useContext();

  // Entender mais sobre o react query dps
  if (getProducts.isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(newProduct);
          addProduct.mutate(newProduct, {
            onSuccess(value) {
              client.getProducts.refetch();
            },
          });
        }}
      >
        <input type='text' onChange={(e) => setNewProduct(e.target.value)} />
        <button>Save</button>
      </form>
      <div>{JSON.stringify(getProducts.data)}</div>
    </div>
  );
}

export default App;
