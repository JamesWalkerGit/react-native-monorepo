import '@testing-library/jest-dom'
import { act, screen } from '@testing-library/react'
import { render } from './utils/testUtils';
import Footer from '@/app/components/Footer/Footer';


describe('Footer', () => {
    it('has GithubButton and Contact button', async () => {

        render(<Footer />);

        const contactButton = await screen.findByRole('button', { name: 'Contact' });
        expect(contactButton).toBeInTheDocument();

        const githubLink = screen.getByRole('link', { name: 'Github Icon' });
        expect(githubLink).toHaveAttribute('href', 'https://github.com/JamesWalkerGit/react-native-monorepo/tree/main/apps/web');
    });
})