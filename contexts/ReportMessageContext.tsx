import { MessageData, ReportMessage } from "@/utils/firebase/firestore";
import { createContext, useContext, useState } from "react";


const ReportMessageContext = createContext<{reportMessage: ReportMessage | null, setReportMessage: React.Dispatch<React.SetStateAction<ReportMessage | null>>}>({reportMessage: null, setReportMessage: () => {}})

export function ReportMessageProvider({children}: {children: React.ReactNode}) {
    const [reportMessage, setReportMessage] = useState<ReportMessage | null>({
        id: null,
        isModalOpen: false,
        message: null,
        reporterId: '',
        reporterDisplayName: '',
        reason: '',
        timestamp: '',
    })

    return (
        <ReportMessageContext.Provider value={{reportMessage, setReportMessage}}>
            {children}
        </ReportMessageContext.Provider>
    )
}

export function useReportMessage() {
    const context = useContext(ReportMessageContext)
    if (context === undefined) {
        throw new Error('useReportMessage must be used within an ReportMessageProvider')
    }
    return context
}



