import { createContext, useContext, useState } from "react";


const ActiveViewContext = createContext<{activeView: string, setActiveView: React.Dispatch<React.SetStateAction<string>>} | undefined>(undefined)

export function ActiveViewProvider({children}: {children: React.ReactNode}) {
    const [activeView, setActiveView] = useState('heroSection')

    return (
        <ActiveViewContext.Provider value={{activeView, setActiveView}}>
            {children}
        </ActiveViewContext.Provider>
    )
}

export function useActiveView() {
    const context = useContext(ActiveViewContext)
    if (context === undefined) {
        throw new Error('useActiveView must be used within an ActiveViewProvider')
    }
    return context
}



