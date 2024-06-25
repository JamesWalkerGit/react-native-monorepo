import '@testing-library/jest-dom'
import { act, screen } from '@testing-library/react'
import { render } from './utils/testUtils';
import nextAuth from 'next-auth/react'
import { unauthenticatedSessionMock } from './mocks/auth/consts';
import GithubButton from '@/app/components/auth/GithubButton';

jest.mock("next-auth/react", () => ({
    useSession: jest.fn(),
    signIn: jest.fn()
}));

const mockNextAuth = nextAuth as jest.Mocked<typeof nextAuth>;

describe('GithubButton', () => {
    it('has github sign in loading - loading', async () => {
        mockNextAuth.useSession.mockReturnValue(unauthenticatedSessionMock)
        render(<GithubButton />);

        const signInButton = await screen.findByRole('button', { name: 'Sign In With GitHub' });

        act(() => {
            signInButton.click();
        });

        const loading = await screen.findByLabelText('Github Login Loading Spinner');
        expect(loading).toBeInTheDocument();
    });
})