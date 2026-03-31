import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { render } from './utils/testUtils'
import OAuthErrorPage from '@/app/auth/error/page'

describe('OAuthErrorPage', () => {
    it('shows error text, owl interaction, and return button', async () => {
        render(<OAuthErrorPage />)

        const title = await screen.findByText('OAuth Login Error')
        expect(title).toBeInTheDocument()

        const message = await screen.findByText('Perhaps some account setting denied authorization 😢')
        expect(message).toBeInTheDocument()

        const owlMessage = await screen.findByText("The Owl is sad you got an error, but if you press the button you'll make him feel better")
        expect(owlMessage).toBeInTheDocument()

        const owlPressButton = await screen.findByRole('button', { name: 'Press Button' })
        expect(owlPressButton).toBeInTheDocument()

        const returnButton = await screen.findByRole('button', { name: 'Return Home' })
        expect(returnButton).toBeInTheDocument()

        const homeLink = returnButton.closest('a')
        expect(homeLink).toHaveAttribute('href', '/')

        const owlAnimation = await screen.findByText('mockDotLottieReact')
        expect(owlAnimation).toBeInTheDocument()
    })
})
