import '@testing-library/jest-dom'
import { act, screen } from '@testing-library/react'
import { render } from './utils/testUtils';
import Navbar from '@/app/components/Navbar';


describe('Navbar', () => {
    it('has theme toggleButton with proper icons based on selected theme', async () => {
        render(<Navbar />);

        const toggleThemeDark = await screen.findByLabelText('Set Dark Theme');
        const darkThemeIcon = await screen.findByLabelText('Dark Theme Icon');
        expect(darkThemeIcon).toBeInTheDocument();
        expect(toggleThemeDark).toBeInTheDocument();

        act(() => {
            toggleThemeDark.click();
        });

        const toggleThemeLight = await screen.findByLabelText('Set Light Theme');
        const lightThemeIcon = await screen.findByLabelText('Light Theme Icon');

        expect(lightThemeIcon).toBeInTheDocument();
        expect(toggleThemeLight).toBeInTheDocument();
    })
})