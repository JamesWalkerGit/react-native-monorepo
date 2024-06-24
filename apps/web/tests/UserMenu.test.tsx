import '@testing-library/jest-dom'
import { act, screen } from '@testing-library/react'
import { render } from './utils/testUtils';
import nextAuth from 'next-auth/react'
import { authenticatedSessionMock, unauthenticatedSessionMock } from './mocks/auth/consts';
import UserMenu from '@/app/components/Navbar/UserMenu';

jest.mock("next-auth/react", () => ({
    useSession: jest.fn()
}));

const mockNextAuth = nextAuth as jest.Mocked<typeof nextAuth>;

describe('UserMenu', () => {
    it('has toggle theme buttons - unauthenticated', async () => {
        mockNextAuth.useSession.mockReturnValue(unauthenticatedSessionMock)
        render(<UserMenu />);

        const userMenuButtons = await screen.findAllByLabelText('User Settings');

        act(() => {
            userMenuButtons[0].click();
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

    it('has user labels and toggle theme - authenticated', async () => {
        mockNextAuth.useSession.mockReturnValue(authenticatedSessionMock)

        render(<UserMenu />);

        const userMenuButtons = await screen.findAllByLabelText('User Settings');

        act(() => {
            userMenuButtons[0].click();
        });

        const signOutButton = await screen.findByLabelText('Sign Out');
        const emailLabel = await screen.findByLabelText('User Email');
        const userEmail = await screen.findByText('testEmail@test.com');
        const pointsLabel = await screen.findByText('Points: 0');


        expect(signOutButton).toBeInTheDocument();
        expect(emailLabel).toBeInTheDocument();
        expect(userEmail).toBeInTheDocument();
        expect(pointsLabel).toBeInTheDocument();


        const toggleThemeButton = await screen.findByLabelText('Toggle Theme');
        expect(toggleThemeButton).toBeInTheDocument();
        const toggleThemeLight = await screen.findByLabelText('Light Theme Icon');
        expect(toggleThemeLight).toBeInTheDocument();

        act(() => {
            toggleThemeButton.click();
        });

        const toggleThemeDark = await screen.findByLabelText('Dark Theme Icon');
        expect(toggleThemeDark).toBeVisible();
    })
})