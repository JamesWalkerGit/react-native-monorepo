import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Web from '../app/page'

describe('Page', () => {
    it('renders a heading', () => {
        render(<Web />)

        const heading = screen.getByRole('button', { name: 'Party Button 🎉' })

        expect(heading).toBeInTheDocument()
    })
})