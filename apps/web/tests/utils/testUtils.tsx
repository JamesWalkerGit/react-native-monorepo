import React from 'react'
import { render } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { BottomSheetProvider } from '@/app/contexts/BottomSheetContext'

const AllTheProviders = ({ children }: any) => {
    return (
        <MantineProvider >
            <BottomSheetProvider>
                {children}
            </BottomSheetProvider>
        </MantineProvider>
    )
}

const customRender = (ui: any, options?: any): any =>
    render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }