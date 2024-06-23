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

        const toggleThemeBefore = await screen.findByLabelText('Toggle color scheme');
        const darkThemeIcon = await screen.findByLabelText('Dark Theme Icon');
        expect(darkThemeIcon).toBeInTheDocument();
        expect(toggleThemeBefore).toBeInTheDocument();

        act(() => {
            toggleThemeBefore.click();
        });

        const toggleThemeAfter = await screen.findByLabelText('Toggle color scheme');
        const lightThemeIcon = await screen.findByLabelText('Light Theme Icon');

        expect(lightThemeIcon).toBeInTheDocument();
        expect(toggleThemeAfter).toBeInTheDocument();
    });

    it('has github sign in button - unauthenticated', async () => {
        mockNextAuth.useSession.mockReturnValue(unauthenticatedSessionMock)

        render(<Navbar />);
        const signInButton = await screen.findAllByRole('button', { name: 'Sign In With GitHub' });
        expect(signInButton[0]).toBeInTheDocument();
        expect(signInButton[1]).toBeInTheDocument();
    });

    it('has github sign out button - authenticated', async () => {
        mockNextAuth.useSession.mockReturnValue(authenticatedSessionMock)

        render(<Navbar />);
        const signOutButtons = await screen.findAllByRole('button', { name: 'Sign Out', });
        expect(signOutButtons[0]).toBeInTheDocument();
        expect(signOutButtons[1]).toBeInTheDocument();
    })
})