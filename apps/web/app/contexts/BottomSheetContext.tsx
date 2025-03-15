'use client'
import * as React from 'react'
import { useState } from 'react'

type BottomSheetProvider = { children: React.ReactNode }

const BottomSheetContext = React.createContext<
    { isBottomSheetShowing: boolean, toggleBottomSheet: () => void } | undefined
>(undefined)


function BottomSheetProvider({ children }: BottomSheetProvider) {
    const [isBottomSheetShowing, setIsBottomSheetShowing] = useState(false);


    const toggleBottomSheet = () => {
        setIsBottomSheetShowing(!isBottomSheetShowing);
    }

    const value = { isBottomSheetShowing, toggleBottomSheet }
    return (
        <BottomSheetContext.Provider value={value}>
            {children}
        </BottomSheetContext.Provider>
    )
}

function useBottomSheet() {
    const context = React.useContext(BottomSheetContext)
    if (context === undefined) {
        throw new Error('useBottomSheet must be used within a BottomSheetProvider')
    }
    return context
}

export { BottomSheetProvider, useBottomSheet }
