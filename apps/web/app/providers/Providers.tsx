"use client"

import { MantineProvider } from '@mantine/core'
import LogRocket from 'logrocket';
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    LogRocket.init('wymeno/jprojects');
  }, []);

  return (
    <SessionProvider>
      <MantineProvider defaultColorScheme='dark'>
        {children}
      </MantineProvider>
    </SessionProvider>
  )
}