import '@testing-library/jest-dom'
import { act, screen } from '@testing-library/react'
import Homepage from '../app/page'
import nextAuth from 'next-auth/react'
import { authenticatedSessionMock, loadingSessionMock, unauthenticatedSessionMock } from './mocks/auth/consts';
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
        const signInButton = await screen.findByRole('button', { name: 'Sign In With GitHub' });
        const spinner = screen.queryByLabelText('loading-spinner');

        expect(partyButton).toBeInTheDocument();
        expect(signInButton).toBeInTheDocument();
        expect(spinner).not.toBeInTheDocument();
    })

    it('renders properly when loading complete - authenticated', async () => {
        mockNextAuth.useSession.mockReturnValue(authenticatedSessionMock);
        render(<Homepage />);

        const partyButton = await screen.findByRole('button', { name: 'Party Button 🎉' });
        const signOutButton = await screen.findByRole('button', { name: 'Sign Out', });
        const spinner = screen.queryByLabelText('loading-spinner');
        const loggedInUser = await screen.findByText('Logged in as testEmail@test.com');

        expect(partyButton).toBeInTheDocument();
        expect(signOutButton).toBeInTheDocument();
        expect(loggedInUser).toBeInTheDocument();
        expect(spinner).not.toBeInTheDocument();
    })

    it('renders a spinner when loading', async () => {
        mockNextAuth.useSession.mockReturnValue(loadingSessionMock)
        render(<Homepage />);

        const spinner = await screen.findByLabelText('loading-spinner');

        expect(spinner).toBeInTheDocument();
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

        const confettiAfter = screen.queryByLabelText('confetti-party');
        expect(confettiAfter).not.toBeInTheDocument();
    })
})