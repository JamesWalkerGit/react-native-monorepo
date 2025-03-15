// app/providers.tsx

import { MantineProvider } from '@mantine/core'
import { SessionProvider } from 'next-auth/react'
import { BottomSheetProvider } from '../contexts/BottomSheetContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <MantineProvider defaultColorScheme='dark'>
        <BottomSheetProvider>
          {children}
        </BottomSheetProvider>
      </MantineProvider>
    </SessionProvider>
  )
}