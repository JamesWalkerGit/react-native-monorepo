import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { render } from './utils/testUtils'
import OAuthErrorPage from '@/app/auth/error/page'

describe('OAuthErrorPage', () => {
    it('shows error text, return button, and happy square animation', async () => {
        render(<OAuthErrorPage />)

        const title = await screen.findByText('OAuth Login Error')
        expect(title).toBeInTheDocument()

        const message = await screen.findByText('Perhaps some account setting denied authorization 😢')
        expect(message).toBeInTheDocument()

        const returnButton = await screen.findByRole('button', { name: 'Return Home' })
        expect(returnButton).toBeInTheDocument()

        const homeLink = returnButton.closest('a')
        expect(homeLink).toHaveAttribute('href', '/')

        const happySquare = await screen.findByText('mockDotLottieReact')
        expect(happySquare).toBeInTheDocument()
    })
})
