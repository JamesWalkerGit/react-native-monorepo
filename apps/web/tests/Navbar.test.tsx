import '@testing-library/jest-dom'
import { act, screen } from '@testing-library/react'
import { render } from './utils/testUtils';
import Navbar from '@/app/components/Navbar';


describe('Navbar', () => {
    it('has theme toggleButton with proper icons based on selected theme', async () => {
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
    })
})