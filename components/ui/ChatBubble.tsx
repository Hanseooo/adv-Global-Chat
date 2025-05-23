import { useAuth } from '@/contexts/FirebaseAuthContext'
import createStyles from '@/stylesheets/createStyles'
import React, { useState } from 'react'
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MessageOptions from './MessageOptions';
import { useReportMessage } from '@/contexts/ReportMessageContext';

type ChatBubbleProps = {
    text: string | null,
    displayName: string | null,
    photoUrl: string | null,
    isPinnedMessage: boolean,
    messageObject: any,
    messageId: string | null,
}

export default function ChatBubble({text, displayName, photoUrl, isPinnedMessage, messageObject, messageId} : ChatBubbleProps) {
    const styles = createStyles()
    const { user } = useAuth()
    const [showDots, setShowDots] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const {reportMessage, setReportMessage} = useReportMessage()
    // console.log(messageId + " " + text)
    const refreshPhotoURL = user?.photoURL + '?t=' + new Date().getTime();

    console.log(user?.photoURL)
    console.log(photoUrl)

    

    const handleShowOptions = async () => {
        setShowOptions(!showOptions)
        setReportMessage({
            ...reportMessage,
            id: "",
            isModalOpen: false,
            message: messageObject,  
            reporterId: user?.uid,
            reporterDisplayName: user?.displayName,
            reason: reportMessage?.reason,
            timestamp: "",
        })
    }
  return (
        <Pressable onPress={() => handleShowOptions()} onHoverOut={() => {setShowDots(false); setShowOptions(false)}}>
            <View style={[styles.chatBubble, {alignSelf: "flex-start"}]}>
                <View style={[{alignItems: "flex-end", flexDirection: "row"}]}>
                    <Image source={photoUrl ? {uri: photoUrl} : require("@/assets/images/blank-pfp.png")} style={[{width:24, height:24, borderRadius: "50%", marginRight: 4}]} />
                </View>
                <Pressable onLongPress={() => handleShowOptions()} onHoverIn={() => setShowDots(true)} onHoverOut={() => setShowDots(false)}  style={[{maxWidth: "70%", justifyContent: "flex-end"}]}>
                    <View style={[{ maxWidth: "100%"}]}>
                        <View style={[{flexDirection: "row"}]}>
                            <Text style={[{marginBottom: 4, marginLeft: 8, color: "rgb(175, 175, 175)"}]}>{displayName ? displayName : "user"}</Text>
                            {isPinnedMessage ? <Entypo name='pin' size={12} color={"rgb(175, 175, 175)"} /> : null}
                        </View>
                        <View style={[styles.chatBubbleText]}>
                            <Text style={[styles.textDefault]}>{text}</Text>
                        </View>
                    </View>
                </Pressable>
                <Pressable onPress={() => handleShowOptions()} onHoverIn={() => setShowDots(true)} style={[{alignSelf: showOptions ? "flex-end" :  "center", margin: 4, opacity: showDots ? 1 : 0, marginBottom: showOptions ? 16 : 0}]}>
                    <Entypo name="dots-three-vertical" size={16} color="rgba(240, 240, 240, 0.25)" />
                </Pressable>
                <MessageOptions messageObject={messageObject}  showOptions={showOptions} messageId={messageId} isMyMessage={false} isPinnedMessage={isPinnedMessage}  />
            </View>
        </Pressable>

  )
}
