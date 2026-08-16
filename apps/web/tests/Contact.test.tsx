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
    it('has contact text and links', async () => {
        mockNextAuth.useSession.mockReturnValue(unauthenticatedSessionMock)

        render(<Contact />);

        const contactText = await screen.findByText('Contact');
        expect(contactText).toBeInTheDocument();

        const linkedInText = await screen.findByText('Linkedin');
        expect(linkedInText).toBeInTheDocument();
        const linkedinLink = screen.getByRole('link', { name: 'http://linkedin.com/in/jameswalkerlinkedin' });
        expect(linkedinLink).toHaveAttribute('href', 'http://linkedin.com/in/jameswalkerlinkedin');

        const githubText = await screen.findByText('GitHub');
        expect(githubText).toBeInTheDocument();
        const githubLink = screen.getByRole('link', { name: 'https://github.com/JamesWalkerGit' });
        expect(githubLink).toHaveAttribute('href', 'https://github.com/JamesWalkerGit');

        const emailText = await screen.findByText('JProjectsMail@gmail.com');
        expect(emailText).toBeInTheDocument();
        const emailLink = screen.getByRole('link', { name: 'Mail To JProjectsmail@gmail.com' });
        expect(emailLink).toHaveAttribute('href', 'mailto:JProjectsMail@gmail.com');

        const emailButton = screen.getByRole('button', { name: 'JprojectsMail@gmail.com' });
        expect(emailButton).toBeInTheDocument();
    })
})