import React from 'react'
import { render } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'

const AllTheProviders = ({ children }: any) => {
    return (
        <MantineProvider >
            {children}
        </MantineProvider>
    )
}

const customRender = (ui: any, options?: any): any =>
    render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }