import createStyles from '@/stylesheets/createStyles'
import Entypo from '@expo/vector-icons/Entypo'
import React, { useState } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import MessageOptions from './MessageOptions'

type MyChatBubbleProps = {
    text: string | null,
    isPinnedMessage: boolean,
    messageObject: any,
    messageId: string | null,
}

export default function MyChatBubble({text, isPinnedMessage, messageObject, messageId} : MyChatBubbleProps) {
    const styles = createStyles()
    const [showDots, setShowDots] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
  return (
    <Pressable onPress={() => setShowOptions(false)} onHoverOut={() => {setShowDots(false); setShowOptions(false)}}>
        <View style={[styles.chatBubble, {flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end", flexWrap: "wrap-reverse"}]}>
            <MessageOptions messageObject={messageObject} showOptions={showOptions} messageId={messageId} isMyMessage={true} isPinnedMessage={isPinnedMessage}  />
            <Pressable onPress={() => setShowOptions(!showOptions)} onHoverIn={() => setShowDots(true)} style={[{alignSelf: showOptions ? "flex-end" :  "center", margin: 4, opacity: showDots ? 1 : 0, marginBottom: showOptions ? 16 : 0}]}>
                <Entypo name="dots-three-vertical" size={16} color="rgba(240, 240, 240, 0.25)" />
            </Pressable>
            <Pressable onLongPress={() => setShowOptions(true)} onHoverIn={() => setShowDots(true)} onHoverOut={() => setShowDots(false)}  style={[{maxWidth: "70%", justifyContent: "flex-end"}]}>
                {isPinnedMessage ? <Entypo name='pin' size={12} color={"rgb(175, 175, 175)"} /> : null}
                <View style={[styles.chatBubbleText, styles.myChatBubble, {justifyContent: "center", borderEndStartRadius: 16, maxWidth: "100%"}]}>
                    <Text style={[styles.textDefault]}>{text}</Text>
                </View>
            </Pressable>
        </View>
    </Pressable>
  )
}
