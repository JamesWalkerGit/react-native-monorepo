import '@testing-library/jest-dom'
import { act, screen } from '@testing-library/react'
import { render } from './utils/testUtils';
import { useBottomSheet } from '@/app/contexts/BottomSheetContext';
import { Button } from '@mantine/core';

describe('BottomSheetContext', () => {
    it('should toggle isBottomSheetShowing', async () => {
        function MockComponent() {
            const bottomSheet = useBottomSheet();
            return (
                <>
                    <div>
                        is bottomsheet showing is {bottomSheet.isBottomSheetShowing.toString()}
                    </div>
                    <Button onClick={bottomSheet.toggleBottomSheet}>toggle bottomsheet</Button>
                </>
            )
        }
        render(<MockComponent />);

        await screen.findByText('is bottomsheet showing is false');
        const toggleBottomSheetButton = await screen.findByRole('button', { name: 'toggle bottomsheet' });

        act(() => {
            toggleBottomSheetButton.click();
        });

        await screen.findByText('is bottomsheet showing is true');
    });
})