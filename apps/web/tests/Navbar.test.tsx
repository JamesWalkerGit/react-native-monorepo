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
    it('has theme toggleButton with proper icons based on selected theme', async () => {
        mockNextAuth.useSession.mockReturnValue(unauthenticatedSessionMock)

        render(<Navbar />);

        const userSettingsButton = await screen.findByLabelText('User Settings');
        expect(userSettingsButton).toBeInTheDocument();

        act(() => {
            userSettingsButton.click();
        });

        const toggleThemeButton = await screen.findByLabelText('Toggle Theme');
        expect(toggleThemeButton).toBeInTheDocument();

        const toggleThemeLight = await screen.findByLabelText('Light Theme Icon');
        expect(toggleThemeLight).toBeInTheDocument();

        act(() => {
            toggleThemeButton.click();
        });

        const toggleThemeDark = await screen.findByLabelText('Dark Theme Icon');
        expect(toggleThemeDark).toBeVisible();
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

        const userSettingsButton = await screen.findByLabelText('User Settings');
        expect(userSettingsButton).toBeInTheDocument();

        act(() => {
            userSettingsButton.click();
        });

        const signOutButton = await screen.findByLabelText('Sign Out');
        expect(signOutButton).toBeInTheDocument();
    })
})