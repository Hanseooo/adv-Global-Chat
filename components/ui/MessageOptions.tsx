import { useAuth } from '@/contexts/FirebaseAuthContext';
import { useReportMessage } from '@/contexts/ReportMessageContext';
import createStyles from '@/stylesheets/createStyles'
import { MessageData } from '@/utils/firebase/firestore';
import { deleteChatDocument, editChatFields } from '@/utils/firebase/firestoreCrud';
import Entypo from '@expo/vector-icons/Entypo'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type MessageOptionsProps = {
    showOptions: boolean,
    isMyMessage: boolean,
    isPinnedMessage: boolean,
    messageId: string | null,
    messageObject: MessageData
}

export default function MessageOptions({showOptions, isMyMessage, isPinnedMessage, messageId, messageObject} : MessageOptionsProps) {
    const styles = createStyles()
    const {user} = useAuth()
    const {reportMessage, setReportMessage} = useReportMessage()


    const handlePinMessage = async () => {
        if(!messageId) return
        await editChatFields(messageId, 'isPinnedMessage', messageObject)
    }

    const handleDeleteMessage = async () => {
        if(!messageId) return
        await deleteChatDocument(messageId)
    }

    const handleReportMessage = async () => {
        setReportMessage({...reportMessage,
            id: null,
            isModalOpen: true,
            message: messageObject,
            reporterId: user!.uid,
            reporterDisplayName: user ? user.displayName : "user",
            reason: '',
            timestamp: ""
        })
    }
    
  return (
    <View style={[{backgroundColor: "rgba(84, 84, 91, 0.5)", padding: 8, justifyContent: 'center', borderRadius: 8, borderWidth: 1, borderColor: "rgba(240, 240, 240, 0.5)", display: showOptions ? "flex" : "none", marginTop: 4}]}>
        <TouchableOpacity onPress={(() => handlePinMessage())} style={[{flexDirection: 'row', alignItems: "center"}]}>
            {isPinnedMessage ? <MaterialCommunityIcons style={[{margin: 4}]} name="pin-off" size={16} color="rgba(240, 240, 240, 0.75)" /> : <Entypo style={[{margin: 4}]} name="pin" size={16} color="rgba(240, 240, 240, 0.75)" />}
            <Text style={[styles.textDefault, {color: "rgb(175, 175, 175)", margin: 1}]}>{isPinnedMessage ? "Remove Pin" : "Pin Message"}</Text>
        </TouchableOpacity>
        <View style={[{borderBottomWidth: 1, borderColor:"rgba(240, 240, 240, 0.25)", marginVertical: 4}]}></View>
        <TouchableOpacity style={[{flexDirection: 'row', alignItems: "center"}]}>
            <Ionicons style={[{margin: 4}]} name="copy" size={16} color="rgba(240, 240, 240, 0.75)" />
            <Text style={[styles.textDefault, {color: "rgb(175, 175, 175)", margin: 1}]}>Copy Text</Text>
        </TouchableOpacity>

        {isMyMessage === false ? (
            <>
                <View style={[{borderBottomWidth: 1, borderColor:"rgba(240, 240, 240, 0.25)", marginVertical: 4}]}></View>
                <TouchableOpacity onPress={() => handleReportMessage()} style={[{flexDirection: 'row', alignItems: "center"}]}>
                    <Ionicons style={[{margin: 4}]} name="flag-sharp" size={16} color="rgba(240, 240, 240, 0.75)" />
                    <Text style={[styles.textDefault, {color: "rgb(175, 175, 175)", margin: 1}]}>Report Message</Text>
                </TouchableOpacity>
            </>
        ) : null }

        {isMyMessage ? (
            <>
                <View style={[{borderBottomWidth: 1, borderColor:"rgba(240, 240, 240, 0.25)", marginVertical: 4}]}></View>
                <TouchableOpacity onPress={() => handleDeleteMessage()} style={[{flexDirection: 'row', alignItems: "center"}]}>
                    <MaterialIcons style={[{margin: 4}]} name="delete" size={16} color="rgba(240, 240, 240, 0.75)" />
                    <Text style={[styles.textDefault, {color: "rgb(175, 175, 175)", margin: 1}]}>Delete Message</Text>
                </TouchableOpacity>
            </>
        ) : null }

    </View>
  )
}
