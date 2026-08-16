import '@testing-library/jest-dom'
import { act, screen } from '@testing-library/react'
import Homepage from '../app/page'
import nextAuth from 'next-auth/react'
import { authenticatedSessionMock, unauthenticatedSessionMock } from './mocks/auth/consts';
import { render } from './utils/testUtils';

jest.mock("next-auth/react", () => ({
    useSession: jest.fn()
}));

const mockNextAuth = nextAuth as jest.Mocked<typeof nextAuth>;

const mockViewport = (isMobile: boolean) => {
    (window as any).matchMedia = jest.fn().mockImplementation((query: string) => ({
        matches: query === '(hover: none) and (pointer: coarse)' ? isMobile : false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    }));
};

const revealBottomPeekButton = () => {
    Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true });
    Object.defineProperty(window, 'scrollY', { value: 1000, writable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, configurable: true });

    act(() => {
        window.dispatchEvent(new Event('scroll'));
        window.dispatchEvent(new WheelEvent('wheel', { deltaY: 120 }));
    });
};

describe('Homepage', () => {
    it('shows tap label on mobile when unauthenticated', async () => {
        mockViewport(true);
        mockNextAuth.useSession.mockReturnValue(unauthenticatedSessionMock);
        render(<Homepage />);

        revealBottomPeekButton();

        expect(await screen.findByRole('button', { name: 'Tap Here? 👀' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Click Here? 👀' })).not.toBeInTheDocument();
    });

    it('shows click label on desktop when unauthenticated', async () => {
        mockViewport(false);
        mockNextAuth.useSession.mockReturnValue(unauthenticatedSessionMock);
        render(<Homepage />);

        revealBottomPeekButton();

        expect(await screen.findByRole('button', { name: 'Click Here? 👀' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Tap Here? 👀' })).not.toBeInTheDocument();
    });

    it('renders properly when loading complete with owlButton and modal - unauthenticated', async () => {
        mockViewport(false);
        mockNextAuth.useSession.mockReturnValue(unauthenticatedSessionMock)
        render(<Homepage />);

        const partyButton = await screen.findByRole('button', { name: 'Party Button 🎉' });
        const spinner = screen.queryByLabelText('loading-spinner');
        expect(partyButton).toBeInTheDocument();
        expect(spinner).not.toBeInTheDocument();

        revealBottomPeekButton();

        const owlButton = await screen.findByRole('button', { name: 'Click Here? 👀' });

        act(() => {
            owlButton.click();
        })

        const modalText = await screen.findByText('You\'re almost there! 🙌');
        const owlTextUnauthenticated = await screen.findByText('Sign in and press the button to make the owl happy 😃');

        const owlHappyButton = await screen.findByRole('button', { name: 'Press' });
        const signInModalButton = await screen.findByRole('button', { name: 'Sign In For Owl 🥺' });

        act(() => {
            owlHappyButton.click();
        });

        expect(modalText).toBeInTheDocument();
        expect(owlTextUnauthenticated).toBeInTheDocument();
        expect(owlHappyButton).toBeDisabled();
        expect(signInModalButton).toBeInTheDocument();
    })

    it('renders properly when loading complete with owlButton and modal - authenticated', async () => {
        mockViewport(false);
        mockNextAuth.useSession.mockReturnValue(authenticatedSessionMock);
        render(<Homepage />);

        const partyButton = await screen.findByRole('button', { name: 'Party Button 🎉' });
        const spinner = screen.queryByLabelText('Github Login - Loading Spinner');

        expect(partyButton).toBeInTheDocument();
        expect(spinner).not.toBeInTheDocument();

        revealBottomPeekButton();

        const owlButton = await screen.findByRole('button', { name: "How's Owl? 🦉" });

        act(() => {
            owlButton.click();
        })

        const modalText = await screen.findByText('Congratulations! You did it! 🥳');
        const owlTextAuthenticated = await screen.findByText('Press the button to make the owl happy!');

        const owlHappyButton = await screen.findByRole('button', { name: 'Press' });

        expect(modalText).toBeInTheDocument();
        expect(owlTextAuthenticated).toBeInTheDocument();
        expect(owlHappyButton).not.toBeDisabled();
    })

    it('should display confetti', async () => {
        mockViewport(false);
        mockNextAuth.useSession.mockReturnValue(authenticatedSessionMock)

        render(<Homepage />);

        const partyButton = await screen.findByRole('button', { name: 'Party Button 🎉' });

        act(() => {
            partyButton.click();
        });
        const confetti = await screen.findByLabelText('confetti-party');

        expect(partyButton).toBeInTheDocument();
        expect(confetti).toBeInTheDocument();

        act(() => {
            partyButton.click();
        });

        const confettiAfter = screen.queryByLabelText('confetti-party');
        expect(confettiAfter).toHaveStyle({
            opacity: '0',
            position: 'fixed',
            pointerEvents: 'none'
        });
        expect(confettiAfter?.getAttribute('style')).toContain('transition-property: opacity, transform');
        expect(confettiAfter?.getAttribute('style')).toContain('transform: translateY(');
    })
})