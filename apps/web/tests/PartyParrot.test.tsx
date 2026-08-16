import '@testing-library/jest-dom'
import { act, screen } from '@testing-library/react'
import { render } from './utils/testUtils';
import PartyParrot from '@/app/components/animations/PartyParrot';

describe('PartyParrot', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });
    it('has contact text and links', async () => {
        render(<PartyParrot />);

        const loadingSpinner = await screen.findByLabelText('Loading Parrot Spinner');
        expect(loadingSpinner).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        const mockPartyParrot = await screen.findByText('mockDotLottieReact');
        expect(mockPartyParrot).toBeInTheDocument();
    })
})