import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function TanStackReactQuerryProvider({ children }: any) {
  const queryClient = new QueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
