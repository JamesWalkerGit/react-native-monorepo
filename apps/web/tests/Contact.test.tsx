import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { render } from './utils/testUtils';
import nextAuth from 'next-auth/react'
import { unauthenticatedSessionMock } from './mocks/auth/consts';
import Contact from '@/app/contact/page';

jest.mock("next-auth/react", () => ({
    useSession: jest.fn(),
    signIn: jest.fn()
}));

const mockNextAuth = nextAuth as jest.Mocked<typeof nextAuth>;

describe('Contact', () => {
    it('has contact text', async () => {
        mockNextAuth.useSession.mockReturnValue(unauthenticatedSessionMock)

        render(<Contact />);

        const contactText = await screen.findByText('Contact me here:');
        expect(contactText).toBeInTheDocument();
    })
})