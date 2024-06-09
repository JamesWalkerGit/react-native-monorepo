// app/providers.tsx

import { NextUIProvider } from '@nextui-org/react'
import NextAuthProvider from './NextAuthProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </NextAuthProvider>
  )
}