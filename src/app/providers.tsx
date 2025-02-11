'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { CanvasProvider } from '~/components/three/canvas-provider'

const queryClient = new QueryClient()

export const Providers = ({ children }: { children?: React.ReactNode }) => {
  return (
    <CanvasProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CanvasProvider>
  )
}
