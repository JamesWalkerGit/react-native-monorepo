import '@testing-library/jest-dom'
import { act, screen } from '@testing-library/react'
import { render } from './utils/testUtils';
import nextAuth from 'next-auth/react'
import Navbar from '@/app/components/Navbar';
import { authenticatedSessionMock, unauthenticatedSessionMock } from './mocks/auth/consts';

jest.mock("next-auth/react", () => ({
    useSession: jest.fn()
}));

const mockNextAuth = nextAuth as jest.Mocked<typeof nextAuth>;

describe('Navbar', () => {
    it('has UserMenu in Navbar', async () => {
        mockNextAuth.useSession.mockReturnValue(unauthenticatedSessionMock)

        render(<Navbar />);

        const userSettingsButton = await screen.findAllByLabelText('User Settings');
        expect(userSettingsButton[0]).toBeInTheDocument();

        act(() => {
            userSettingsButton[0].click();
        });

        const toggleThemeButton = await screen.findByLabelText('Toggle Theme');
        expect(toggleThemeButton).toBeInTheDocument();
    });

    it('has github sign in button - unauthenticated', async () => {
        mockNextAuth.useSession.mockReturnValue(unauthenticatedSessionMock)

        render(<Navbar />);
        const signInButton = await screen.findByRole('button', { name: 'Sign In With GitHub' });
        expect(signInButton).toBeInTheDocument();
    });

    it('has github sign out button - authenticated', async () => {
        mockNextAuth.useSession.mockReturnValue(authenticatedSessionMock)

        render(<Navbar />);

        const userSettingsButton = await screen.findAllByLabelText('User Settings');
        expect(userSettingsButton[0]).toBeInTheDocument();

        act(() => {
            userSettingsButton[0].click();
        });

        const signOutButton = await screen.findByLabelText('Sign Out');
        expect(signOutButton).toBeInTheDocument();
    })
})