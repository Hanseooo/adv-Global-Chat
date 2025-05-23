import { ActiveViewProvider } from "@/contexts/ActiveViewContext";
import { AuthProvider } from "@/contexts/FirebaseAuthContext";
import { ReportMessageProvider } from "@/contexts/ReportMessageContext";
import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  return(
    <AuthProvider>
      <ActiveViewProvider>
        <ReportMessageProvider>
        {/* <Stack
          screenOptions={{
            headerShown:false,
          }}
        /> */}
          <Slot />
        </ReportMessageProvider>
      </ActiveViewProvider>
    </AuthProvider>
  )
}
