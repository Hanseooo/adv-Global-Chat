import { useFonts } from "expo-font";
import { StyleSheet, useWindowDimensions } from "react-native";

const COLORS = {
    white: {
        primary: "rgb(240, 240, 240)"
    },
    black: {
        primary: "rgb(24, 24, 24)"
    }
}


export default function createStyles() {
    const [fontsLoaded] = useFonts({"Poppins": require('@/assets/fonts/Poppins-Regular.ttf'),
        "Poppins-Bold": require('@/assets/fonts/Poppins-Bold.ttf')})
    const height = useWindowDimensions().height

    return StyleSheet.create({
        safeArea: {
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
        },
        textDefault: {
            color: COLORS.white.primary,
            fontFamily: "Poppins"
        },
        headerText: {
            fontSize: 32,
            fontWeight: "700",
            fontFamily: "Poppins-Bold",
        },
        centerContent: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        solidBtn: {
            backgroundColor: COLORS.white.primary,
            padding: 8,
            width: "100%",
            borderRadius: 24
        },
        hollowBtn: {
            padding: 8,
            width: "100%",
            borderRadius: 24,
            borderColor: COLORS.white.primary,
            borderWidth: 2
        },
        input: {
            backgroundColor: COLORS.white.primary,
            padding: 8,
            borderRadius: 4,
            marginTop: 2,
            marginBottom: 4
        },
        formContainer: {
            backgroundColor: "rgba(30, 30, 30, 0.24)",
            padding: 24,
            borderRadius: 24,
            // backdropFilter: "blur(4px)",
            width: "75%",
            maxWidth: 300,
            borderColor:COLORS.white.primary,
            borderWidth: 1
        },
        displayValidity: {
            marginLeft: 2,
            fontSize: 8,
            marginTop: 4,
            fontFamily: "Poppins"
        },
        textDark: {
            color: COLORS.black.primary,
            fontFamily: "Poppins"
        },
        centerText: {
            textAlign: "center"
        },
        errorText: {
            fontSize: 10,
            fontFamily: "Poppins",
            color: COLORS.white.primary
        },
        homeBtn: {
            padding: 8,
        },
        chatInput: {
            fontFamily: "Poppins",
            color: COLORS.white.primary,
            flex: 1,
            marginRight: 4
        },
        chatInputContainer: {
            backgroundColor: "rgb(84, 84, 91)",
            padding: 8,
            width: "100%",
            flexDirection: "row",
            borderRadius: 24,
            marginTop: 4,
        },
        chatContainer: {
            padding: 4,
            flexDirection: "column-reverse",
            width: "90%",
        },
        chatBubble: {
            flexDirection: "row",
            padding: 8,
            width: "100%",
        },
        chatBubbleText: {
            backgroundColor: "rgb(54, 54, 64)",
            padding: 8,
            borderRadius: 16,
            borderEndStartRadius: 4,
            // maxWidth: "70%",
        },
        myChatBubble: {
            backgroundColor: "rgb(90, 90, 101)"
        },
        btnDark: {
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 8,
            backgroundColor: COLORS.white.primary,
            marginVertical: 4
        }
    })
}