import createStyles from '@/stylesheets/createStyles'
import React, { useEffect } from 'react'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { getReportedMessagesFromFirestore } from '@/utils/firebase/firestore';
import { useReportMessage } from '@/contexts/ReportMessageContext';
import { useReportedMessages } from '@/hooks/useFirestoreListener';
import ReportedMessageBubble from '../ui/ReportedMessageBubble';
import { useActiveView } from '@/contexts/ActiveViewContext';
import { deleteChatDocument, deleteSubmittedReport } from '@/utils/firebase/firestoreCrud';

export default function ReportedMessages() {
    const styles = createStyles()
    const {messages, loading, error} = useReportedMessages()
    const {activeView, setActiveView} = useActiveView()

    if (loading) return <ActivityIndicator color={"white"} />

    
  return (
    <View style={[styles.centerContent, {backgroundColor: "rgba(24, 24, 24, 0.25)", borderColor: "rgb(240, 240, 240)", borderWidth: 2, padding: 8, width: "95%", height: "95%", maxWidth: 500, borderRadius: 12, maxHeight: 1000, minHeight: 300, marginTop: 20}]}>
        <TouchableOpacity onPress={() => setActiveView('home')} style={[{alignSelf: "flex-end"}]}>
            <EvilIcons name="close" size={24} color="rgb(240, 240, 240)" />
        </TouchableOpacity>
        <Text style={[styles.textDefault, {fontSize: 24, fontWeight: '600', marginBottom: 12}]}>Reported Messages</Text>
        <ScrollView showsVerticalScrollIndicator={false} style={[{padding: 8, width: "90%", maxWidth: 450}]}>
          {
            messages.map((message) => {
              return (
                <View style={[{backgroundColor: "rgba(24, 24, 24, 0.4)", padding: 12, borderRadius: 12, borderWidth: 1, borderColor: "rgb(240, 240, 240)", marginVertical: 4}]}>
                  <ReportedMessageBubble key={message.message?.id} reportMessage={message} />
                  <Text style={[styles.textDefault, {paddingHorizontal: 12, marginVertical: 2, fontWeight: 500}]}>Reason: {message.reason}</Text>
                  <View style={[styles.centerContent, {flexDirection: "row", gap: 24, marginTop: 12}]}>
                    <TouchableOpacity onPress={() => {deleteChatDocument(message.message?.id); deleteSubmittedReport(message.id)}}><Text style={[styles.textDark, styles.centerText, {borderWidth: 2, borderColor: "rgb(240, 240, 240)",backgroundColor: "rgb(240, 240, 240)", paddingVertical: 8, borderRadius: 8, paddingHorizontal: 16}]}>
                      Delete
                      </Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteSubmittedReport(message.id)} style={[{borderWidth: 2, borderColor: "rgb(240, 240, 240)", paddingVertical: 8, borderRadius: 8, paddingHorizontal: 16}]}><Text style={[styles.textDefault, styles.centerText]}>
                      Ignore
                      </Text></TouchableOpacity>
                  </View>
                </View>
              )
            })
          }
        </ScrollView>
    </View>
  )
}
