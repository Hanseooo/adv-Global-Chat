import createStyles from '@/stylesheets/createStyles'
import React, { useEffect } from 'react'
import { Image, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native'
import PinnedMessageBubble from '../PinnedMessageBubble'
import { MessageData, submitReportMessageToFirestore } from '@/utils/firebase/firestore'
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons'
import { useReportMessage } from '@/contexts/ReportMessageContext'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { generateDate } from '@/utils/generators'
import { serverTimestamp } from 'firebase/firestore'
import ReportedMessageBubble from '../ReportedMessageBubble'

export default function ReportMessageModal() {
    const styles = createStyles()
    const {reportMessage, setReportMessage} = useReportMessage()
    const {user} = useAuth()


    const handleReportMessage = async (option: string) => {
        const data = {
            ...reportMessage,
            id: null,
            isModalOpen: false,
            message: reportMessage?.message ?? null,  
            reporterId: user?.uid ?? null,
            reporterDisplayName: user?.displayName ?? null,
            reason: option,
            timestamp: serverTimestamp(),
        }
        setReportMessage(data)
        await submitReportMessageToFirestore(data)
    }

  return (
    <View style={[styles.centerContent, {height: "100%", width: "100%", position: "absolute", zIndex: 99, backdropFilter: "blur(2px)", display: reportMessage?.isModalOpen ? "flex" : "none"}]}>
        <View style={[{backgroundColor: "rgb(34, 36, 39)", paddingHorizontal: 24, paddingVertical: 16, borderRadius: 12, borderWidth: 1, borderColor: "rgb(240, 240, 240)", maxWidth: 380}]}>
            <TouchableOpacity onPress={() => setReportMessage({
                        ...reportMessage,
                        id: null,
                        isModalOpen: false,
                        message: reportMessage?.message ?? null,  
                        reporterId: user?.uid ?? null,
                        reporterDisplayName: user?.displayName ?? null,
                        reason: reportMessage?.reason ?? null,
                        timestamp: "",
                    })} style={[{alignSelf: "flex-end"}]}>
                <Ionicons name="close-outline" size={24} color="rgb(240, 240, 240)" />
            </TouchableOpacity>
            <Text style={[styles.textDefault, {marginBottom: 2,fontWeight: "600", fontSize: 24}]}>Submit a Report</Text>
            <Text style={[styles.textDefault, {marginVertical: 2,fontSize: 14}]}>Select a message that describes the problem</Text>
            <View style={[{marginVertical: 2}]}>
                <ReportedMessageBubble reportMessage={reportMessage} />
            </View>
            {
                options.map((option, index) => (
                    <TouchableOpacity onPress={() => {
                        handleReportMessage(option)
                        }
                    }
                        
                        style={[{padding: 12, margin: 4, borderRadius: 12, backgroundColor: "rgb(44, 47, 50)", flexDirection: "row", justifyContent: "space-between"}]}>
                        <Text style={[styles.textDefault]}>{option}</Text>
                        <Feather name="chevron-right" size={18} color="rgb(240, 240, 240)" />
                    </TouchableOpacity>
                ))
            }

        </View>
    </View>
  )
}

const options = ["I don't like it", "Spam", "Abuse or harassment",
    "Inappropriate behavior", "Exposing private information", "Violence or threaths",
     "Something else"]
