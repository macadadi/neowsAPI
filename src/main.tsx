import {
    ChakraProvider
} from '@chakra-ui/react'
import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import '@tanstack/react-query'
import { TError } from './neows/data/types'

declare module '@tanstack/react-query' {
    interface Register {
        defaultError: TError
    }
}

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <QueryClientProvider client={queryClient}>
      <ChakraProvider>
    <App />
    </ChakraProvider>
    <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
  </React.StrictMode>,
)
