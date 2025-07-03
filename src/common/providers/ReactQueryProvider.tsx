'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutos
            gcTime: 10 * 60 * 1000, // 10 minutos (cache time)
            retry: (failureCount, error: any) => {
              // No reintentar para errores 404, 401, 403
              if (error?.response?.status === 404) return false;
              if (error?.response?.status === 401) return false;
              if (error?.response?.status === 403) return false;
              return failureCount < 2;
            },
            refetchOnWindowFocus: false, //cuando volver a solicitar datos al volver a la pestaña
            refetchOnMount: true,
            refetchOnReconnect: true,
          },
          mutations: { //configura operaciones de escritura(POST, PUT, DELETE) con un 1 reintento
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
