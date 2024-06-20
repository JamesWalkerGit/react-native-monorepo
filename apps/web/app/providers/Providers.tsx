// app/providers.tsx

import { MantineProvider } from '@mantine/core'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <MantineProvider defaultColorScheme='dark'>
        {children}
      </MantineProvider>
    </SessionProvider>
  )
}