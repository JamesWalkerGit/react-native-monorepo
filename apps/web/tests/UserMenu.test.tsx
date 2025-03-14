import '@testing-library/jest-dom'
import { act, screen } from '@testing-library/react'
import { render } from './utils/testUtils';
import nextAuth from 'next-auth/react'
import { authenticatedSessionMock } from './mocks/auth/consts';
import UserMenu from '@/app/components/UserMenu/UserMenu';

jest.mock("next-auth/react", () => ({
    useSession: jest.fn(),
    signIn: jest.fn()
}));

const mockNextAuth = nextAuth as jest.Mocked<typeof nextAuth>;

describe('UserMenu', () => {
    it('has user labels and sign out- authenticated', async () => {
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
    })
})