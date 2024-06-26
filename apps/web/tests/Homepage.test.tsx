import '@testing-library/jest-dom'
import { act, screen } from '@testing-library/react'
import Homepage from '../app/page'
import nextAuth from 'next-auth/react'
import { authenticatedSessionMock, unauthenticatedSessionMock } from './mocks/auth/consts';
import { render } from './utils/testUtils';

jest.mock("next-auth/react", () => ({
    useSession: jest.fn()
}));

const mockNextAuth = nextAuth as jest.Mocked<typeof nextAuth>;

describe('Page', () => {
    it('renders properly when loading complete - unauthenticated', async () => {
        mockNextAuth.useSession.mockReturnValue(unauthenticatedSessionMock)
        render(<Homepage />);

        const partyButton = await screen.findByRole('button', { name: 'Party Button 🎉' });
        const spinner = screen.queryByLabelText('loading-spinner');

        expect(partyButton).toBeInTheDocument();
        expect(spinner).not.toBeInTheDocument();
    })

    it('renders properly when loading complete - authenticated', async () => {
        mockNextAuth.useSession.mockReturnValue(authenticatedSessionMock);
        render(<Homepage />);

        const partyButton = await screen.findByRole('button', { name: 'Party Button 🎉' });
        const spinner = screen.queryByLabelText('Github Login - Loading Spinner');

        expect(partyButton).toBeInTheDocument();
        expect(spinner).not.toBeInTheDocument();
    })

    it('should display confetti', async () => {
        mockNextAuth.useSession.mockReturnValue(authenticatedSessionMock)

        render(<Homepage />);

        const partyButton = await screen.findByRole('button', { name: 'Party Button 🎉' });

        act(() => {
            partyButton.click();
        });
        const confetti = await screen.findByLabelText('confetti-party');

        expect(partyButton).toBeInTheDocument();
        expect(confetti).toBeInTheDocument();

        act(() => {
            partyButton.click();
        });

        const expectedFadeStyles = "z-index: 2; position: absolute; pointer-events: none; top: 0px; left: 0px; bottom: 0px; right: 0px; transition-property: opacity, transform; transition-duration: 1250ms; transition-timing-function: ease; opacity: 0; transform: translateY(calc(-1.875rem * var(--mantine-scale));"
        const confettiAfter = screen.queryByLabelText('confetti-party');
        expect(confettiAfter).toHaveAttribute('style', expectedFadeStyles);
    })
})