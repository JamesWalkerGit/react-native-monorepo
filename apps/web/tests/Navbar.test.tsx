import '@testing-library/jest-dom'
import { act, screen } from '@testing-library/react'
import { render } from './utils/testUtils';
import nextAuth from 'next-auth/react'
import Navbar from '@/app/components/Navbar/Navbar';
import { authenticatedSessionMock, unauthenticatedSessionMock } from './mocks/auth/consts';

jest.mock("next-auth/react", () => ({
    useSession: jest.fn()
}));

const mockNextAuth = nextAuth as jest.Mocked<typeof nextAuth>;

describe('Navbar', () => {
    it('has GithubButton in Bottom Drawer - unauthenticated', async () => {
        mockNextAuth.useSession.mockReturnValue(unauthenticatedSessionMock)

        render(<Navbar />);

        const signInButton = await screen.findByRole('button', { name: 'Sign In' });
        expect(signInButton).toBeInTheDocument();

        act(() => {
            signInButton.click();
        })

        const githubButton = await screen.findByRole('button', { name: 'Sign In With GitHub' });
        expect(githubButton).toBeInTheDocument();
    });

    it('has sign out button - authenticated', async () => {
        mockNextAuth.useSession.mockReturnValue(authenticatedSessionMock)

        render(<Navbar />);

        const userSettingsButton = await screen.findAllByLabelText('User Settings');
        expect(userSettingsButton[0]).toBeInTheDocument();

        act(() => {
            userSettingsButton[0].click();
        });
    })

    it('has navigation links and burger menu and theme button', async () => {
        mockNextAuth.useSession.mockReturnValue(unauthenticatedSessionMock)

        render(<Navbar />);

        const burgerMenu = await screen.findByLabelText('Toggle sidebar');
        const home = await screen.findByRole('link', { name: 'Home' });
        const contact = await screen.findByRole('link', { name: 'Contact' });


        expect(burgerMenu).toBeInTheDocument();
        expect(home).toBeInTheDocument();
        expect(contact).toBeInTheDocument();

        const themeButtonLight = await screen.findByLabelText('Set Light Theme Icon');
        expect(themeButtonLight).toBeInTheDocument();

        act(() => {
            themeButtonLight.click();
        })

        const themeButtonDark = await screen.findByLabelText('Set Dark Theme Icon');
        expect(themeButtonDark).toBeInTheDocument();
    });
})